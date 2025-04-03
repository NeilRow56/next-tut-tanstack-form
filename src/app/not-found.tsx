const NotFoundPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <div className='w-1/3 rounded-lg p-6 text-center shadow-md'>
        <h1 className='mb-4 text-3xl font-bold'>Not Found</h1>
        <p className='text-destructive'>Could not find requested page</p>
      </div>
    </div>
  )
}

export default NotFoundPage
