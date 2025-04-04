import { getProducts } from '@/prisma-db'
import Link from 'next/link'

export type Product = {
  id: number
  title: string
  price: number
  description: string | null
}

export default async function ProductsPrismaDBPage() {
  const products: Product[] = await getProducts()

  return (
    <ul className='space-y-4'>
      {products.map(product => (
        <li key={product.id} className='rounded-lg bg-gray-200 p-4 shadow-md'>
          <Link href={`/products-db/${product.id}`}>
            <h2 className='text-xl font-semibold'>{product.title}</h2>
          </Link>

          <p>{product.description}</p>
          <p className='text-lg font-medium'> £{product.price}</p>
          <form>
            <button
              type='submit'
              className='mt-4 rounded-md bg-red-500 px-4 py-2 hover:bg-red-400'
            >
              Delete
            </button>
          </form>
        </li>
      ))}
    </ul>
  )
}
