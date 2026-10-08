const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN
const collection = process.env.NEXT_PUBLIC_SHOPIFY_COLLECTION

async function callShopify(query, variables = {}) {
  if (!domain || !storefrontAccessToken) {
    throw new Error('Set the Shopify store domain and public Storefront access token before building.')
  }
  const response = await fetch(`https://${domain}/api/2026-07/graphql.json`, {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })
  if (!response.ok) throw new Error(`Shopify request failed (${response.status})`)
  const { data, errors } = await response.json()
  if (errors?.length) throw new Error(errors.map(error => error.message).join('; '))
  return data
}

const productFields = `
  id title description handle
  images(first: 250) { edges { node { id originalSrc: url height width altText } } }
  variants(first: 250) { edges { node { id title price { amount } } } }
`

function formatProduct(product) {
  if (!product.images.edges.length) {
    product.images.edges.push({ node: { originalSrc: '/images/product-placeholder.svg', altText: 'Product image unavailable', width: 640, height: 640 } })
  }
  product.variants.edges.forEach(({ node }) => { node.price = node.price.amount })
  return product
}

export async function getAllProductsInCollection(handle = collection) {
  // ponytail: 250 products maximum; add cursor pagination when the catalog exceeds this.
  const data = handle
    ? await callShopify(`query CollectionProducts($handle: String!) {
        collection(handle: $handle) { products(first: 250) { edges { node { ${productFields} } } } }
      }`, { handle })
    : await callShopify(`query Products { products(first: 250) { edges { node { ${productFields} } } } }`)
  if (handle && !data.collection) throw new Error(`Shopify collection not found: ${handle}`)
  const products = handle ? data.collection.products.edges : data.products.edges
  products.forEach(({ node }) => formatProduct(node))
  return products
}

export async function getCollections() {
  // ponytail: 250 collections maximum; add cursor pagination for larger catalogs.
  const data = await callShopify(`query StoreCollections {
    collections(first: 250) { nodes {
      id title handle description image { url altText }
      products(first: 1) { nodes { images(first: 1) { nodes { url altText } } } }
    } }
  }`)
  return data.collections.nodes.map(({ products, image, ...item }) => ({
    ...item,
    image: image || products.nodes[0]?.images.nodes[0] || { url: '/images/product-placeholder.svg', altText: 'Collection image unavailable' },
  }))
}

export async function getProductSlugs() {
  return getAllProductsInCollection('')
}

export async function getProduct(handle) {
  const data = await callShopify(`query Product($handle: String!) {
    product(handle: $handle) { ${productFields} }
  }`, { handle })
  if (!data.product) return null
  return formatProduct(data.product)
}

const cartFields = 'id webUrl: checkoutUrl'

function checkoutResult(result) {
  if (result.userErrors.length) throw new Error(result.userErrors.map(error => error.message).join('; '))
  if (!result.cart) throw new Error('Shopify cart is unavailable; please try again.')
  return result.cart
}

export async function createCheckout(id, quantity) {
  const data = await callShopify(`mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) { cart { ${cartFields} } userErrors { message } }
  }`, { input: { lines: [{ merchandiseId: id, quantity }] } })
  return checkoutResult(data.cartCreate)
}

export async function updateCheckout(id, lineItems) {
  const data = await callShopify(`query Cart($id: ID!) {
    cart(id: $id) {
      ${cartFields}
      lines(first: 250) { nodes { id quantity merchandise { ... on ProductVariant { id } } } }
    }
  }`, { id })
  if (!data.cart) throw new Error('Your cart has expired; clear the cart and try again.')
  const existing = data.cart.lines.nodes
  const updates = existing.map(line => ({
    id: line.id,
    quantity: lineItems.find(item => item.variantId === line.merchandise.id)?.quantity || 0,
  }))
  const additions = lineItems.filter(item => !existing.some(line => line.merchandise.id === item.variantId))
    .map(item => ({ merchandiseId: item.variantId, quantity: item.quantity }))
  let cart = data.cart
  if (updates.length) {
    const result = await callShopify(`mutation UpdateCart($id: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $id, lines: $lines) { cart { ${cartFields} } userErrors { message } }
    }`, { id, lines: updates })
    cart = checkoutResult(result.cartLinesUpdate)
  }
  if (additions.length) {
    const result = await callShopify(`mutation AddCartLines($id: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $id, lines: $lines) { cart { ${cartFields} } userErrors { message } }
    }`, { id, lines: additions })
    cart = checkoutResult(result.cartLinesAdd)
  }
  return cart
}
