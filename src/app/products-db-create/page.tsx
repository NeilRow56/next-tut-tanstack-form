import { addProduct } from '@/prisma-db'
import { redirect } from 'next/navigation'
// import { Submit } from "@/components/submit";

export default function AddProductPage() {
  async function createProduct(formData: FormData) {
    'use server'
    const title = formData.get('title') as string
    const price = formData.get('price') as string
    const description = formData.get('description') as string

    await addProduct(title, parseInt(price), description)
    redirect('/products-db')
  }

  return (
    <form
      action={createProduct}
      className='flex h-screen w-screen items-center justify-center'
    >
      <div className='mx-auto flex w-[350px] flex-col space-y-4 p-4'>
        <div>
          <label className=''>
            Title
            <input
              type='text'
              className='block w-full rounded border p-2 text-black'
              name='title'
            />
          </label>
          {/* {state.errors.title && (
          <p className='text-red-500'>{state.errors.title}</p>
        )} */}
        </div>
        <div>
          <label className=''>
            Price
            <input
              type='number'
              className='block w-full rounded border p-2 text-black'
              name='price'
            />
          </label>
          {/* {state.errors.price && (
          <p className='text-red-500'>{state.errors.price}</p>
        )} */}
        </div>
        <div>
          <label className=''>
            Description
            <textarea
              className='block w-full rounded border p-2 text-black'
              name='description'
            />
          </label>
          {/* {state.errors.description && (
          <p className='text-red-500'>{state.errors.description}</p>
        )} */}
        </div>
        <button
          type='submit'
          className='block w-full rounded bg-blue-500 p-2 text-white disabled:bg-gray-500'
          // disabled={isPending}
        >
          Submit
        </button>
        {/* Above button is to illustrate disbled when "isPending", We do not need "isPending" if using the Submit button below as it receives isPending within the component  */}
        {/* <Submit /> */}
      </div>
    </form>
  )
}
