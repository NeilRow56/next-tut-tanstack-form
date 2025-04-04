type Post = {
  userId: number
  id: number
  title: string
  body: string
}

type Album = {
  userId: number
  id: number
  title: string
}

async function getUserPosts(userId: string) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  )
  return res.json()
}

async function getUserAlbums(userId: string) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
  )
  return res.json()
}

export default async function UserProfile({
  params
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params

  const postsData = getUserPosts(userId)
  const albumsData = getUserAlbums(userId)

  // Parralel data fetching using Promise.all. The fetching functions must be before the Promise - They could be in a separate file

  const [posts, albums] = await Promise.all([postsData, albumsData])
  return (
    <div className='mx-auto max-w-7xl p-4'>
      <h1 className='mb-8 text-3xl font-extrabold'>User Profile</h1>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div>
          <h2 className='mb-4 text-2xl font-bold'>Posts</h2>
          <div className='space-y-4'>
            {posts.map((post: Post) => (
              <div key={post.id} className='rounded-lg bg-white p-6 shadow-md'>
                <h3 className='mb-3 text-lg leading-tight font-bold text-gray-800'>
                  {post.title}
                </h3>
                <p className='mb-4 leading-relaxed text-gray-600'>
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='mb-4 text-2xl font-bold'>Albums</h2>
          <div className='space-y-4'>
            {albums.map((album: Album) => (
              <div key={album.id} className='rounded-lg bg-white p-6 shadow-md'>
                <p className='text-gray-700'>{album.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
