import { Suspense } from 'react'
import { Author } from './author'

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export default async function PostsPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts: Post[] = await response.json()

  // filter the posts to only get those posts with an id divisible by 10

  const filteredPosts = posts.filter(post => post.id % 10 === 1)

  return (
    <div className='mx-auto max-w-7xl p-4'>
      <h1 className='mb-8 text-3xl font-extrabold'>Blog Posts</h1>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        {filteredPosts.map(post => (
          <div key={post.id} className='rounded-lg bg-white p-6 shadow-md'>
            <h2 className='mb-3 text-2xl leading-tight font-bold text-gray-800'>
              {post.title}
            </h2>
            <p className='mb-4 leading-relaxed text-gray-600'>{post.body}</p>
            <Suspense
              fallback={
                <div className='text-sm text-gray-500'>Loading author...</div>
              }
            >
              <Author userId={post.userId} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  )
}
