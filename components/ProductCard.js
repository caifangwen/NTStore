import Image from 'next/legacy/image'
import Link from 'next/link'
import Price from '@/components/Price'

function ProductCard({ product }) {
  const handle = product.node.handle
  const title = product.node.title
  const description = product.node.description
  const price = product.node.variants.edges[0].node.price

  const imageNode = product.node.images.edges[0].node

  return (
    <Link
      legacyBehavior
      href={`/products/${handle}`}
      passHref
    >
      <a className="group w-full overflow-hidden rounded-2xl border border-palette-lighter bg-white focus:outline-none focus:ring-2 focus:ring-palette-primary">
        <div className="h-72 border-b border-palette-lighter relative overflow-hidden bg-gray-50">
          <Image
            src={imageNode.originalSrc}
            alt={imageNode.altText || title}
            layout="fill"
            objectFit="contain"
            className="transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="p-5 font-primary">
          <h3 className="truncate text-xl text-palette-dark font-semibold" title={title}>
            {title}
          </h3>
          <div className="mt-2 truncate text-sm text-gray-600">
            {description}
          </div>
          <div className="mt-4 text-palette-primary font-semibold">
            <Price
              currency="$"
              num={price}
              numSize="text-lg"
            />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductCard
