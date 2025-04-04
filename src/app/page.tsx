// import { UserForm } from '@/components/forms/UserForm'

import { ProductForm } from '@/components/forms/ProductForm'

const HomePage = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='flex flex-col'>
        <h1>Home page</h1>
        {/* <UserForm /> */}
        <ProductForm />
      </div>
    </div>
  )
}

export default HomePage
