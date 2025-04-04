const HomePage = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div>
        <h1>Home page</h1>
      </div>
    </div>
  )
}

export default HomePage
