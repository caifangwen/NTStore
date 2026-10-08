import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN = 'test.myshopify.com'
process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN = 'public-test-token'
process.env.NEXT_PUBLIC_SHOPIFY_COLLECTION = ''
const source = await readFile(new URL('../lib/shopify.js', import.meta.url), 'utf8')
const shopify = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
const requests = []
let replies = []
globalThis.fetch = async (url, options) => {
  assert.equal(url, 'https://test.myshopify.com/api/2026-07/graphql.json')
  requests.push(JSON.parse(options.body))
  assert.ok(replies.length, 'Unexpected Shopify request')
  return { ok: true, json: async () => replies.shift() }
}
const cart = { id: 'cart-1', webUrl: 'https://test.myshopify.com/checkout' }
const product = { images: { edges: [] }, variants: { edges: [{ node: { price: { amount: '12.50' } } }] } }
replies = [{ data: { products: { edges: [{ node: product }] } } }]
assert.equal((await shopify.getAllProductsInCollection())[0].node.variants.edges[0].node.price, '12.50')
assert.equal(product.images.edges[0].node.originalSrc, '/images/product-placeholder.svg')
replies = [{ data: { collection: { products: { edges: [] } } } }]
assert.deepEqual(await shopify.getAllProductsInCollection('snowboards'), [])
assert.equal(requests.at(-1).variables.handle, 'snowboards')
replies = [{ data: { collection: null } }]
await assert.rejects(shopify.getAllProductsInCollection('missing'), /collection not found/)
replies = [{ data: { collections: { nodes: [
  { id: 'empty', image: null, products: { nodes: [] } },
  { id: 'custom', image: { url: '/custom.jpg' }, products: { nodes: [] } },
  { id: 'product-image', image: null, products: { nodes: [{ images: { nodes: [{ url: '/product.jpg' }] } }] } },
] } } }]
const collections = await shopify.getCollections()
assert.deepEqual(collections.map(item => item.image.url), ['/images/product-placeholder.svg', '/custom.jpg', '/product.jpg'])
assert.ok(collections.every(item => !('products' in item)))
replies = [{ data: { product: null } }]
assert.equal(await shopify.getProduct('missing'), null)
replies = [{ data: { cartCreate: { cart, userErrors: [] } } }]
assert.deepEqual(await shopify.createCheckout('variant-1', 2), cart)
assert.deepEqual(requests.at(-1).variables.input.lines, [{ merchandiseId: 'variant-1', quantity: 2 }])
replies = [
  { data: { cart: { ...cart, lines: { nodes: [
    { id: 'line-1', merchandise: { id: 'variant-1' } },
    { id: 'line-2', merchandise: { id: 'variant-2' } },
  ] } } } },
  { data: { cartLinesUpdate: { cart, userErrors: [] } } },
  { data: { cartLinesAdd: { cart, userErrors: [] } } },
]
assert.deepEqual(await shopify.updateCheckout('cart-1', [
  { variantId: 'variant-1', quantity: 3 }, { variantId: 'variant-3', quantity: 1 },
]), cart)
assert.deepEqual(requests.at(-2).variables.lines, [{ id: 'line-1', quantity: 3 }, { id: 'line-2', quantity: 0 }])
assert.deepEqual(requests.at(-1).variables.lines, [{ merchandiseId: 'variant-3', quantity: 1 }])
replies = [{ data: { cartCreate: { cart: null, userErrors: [{ message: 'Unavailable variant' }] } } }]
await assert.rejects(shopify.createCheckout('bad', 1), /Unavailable variant/)
replies = [{ errors: [{ message: 'Access denied' }] }]
await assert.rejects(shopify.getProduct('test'), /Access denied/)
globalThis.fetch = async () => ({ ok: false, status: 401 })
await assert.rejects(shopify.getProduct('test'), /401/)
assert.equal(replies.length, 0)
console.log('Shopify checks passed: products, collections, missing data, carts, and API failures.')
