type User = {
  id: number
  name: string
  username: string
  email: string
  phone: string
}

export default async function UsersServer() {
  await new Promise(resolve => setTimeout(resolve, 2000))

  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const users: User[] = await response.json()
  console.log(users)

  return (
    <ul className='space-y-4 p-4'>
      {users.map(user => (
        <li
          key={user.id}
          className='rounded-lg bg-white p-4 text-gray-700 shadow-md'
        >
          <div className='font-bold'>{user.name}</div>
          <div className='text-sm'>
            <div>Username: {user.username}</div>
            <div>Email: {user.email}</div>
            <div>Phone: {user.phone}</div>
          </div>
        </li>
      ))}
    </ul>
  )
}
