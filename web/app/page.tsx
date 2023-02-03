import { getAllUsers } from "@/axios/userRequests"
import Link from "next/link";

export default async function Home() {
  const users = await getAllUsers();

  return (
    <div>
      <h1 className='text-3xl underline font-bold'>Hello World!</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <h2 className="text-lg text-primary-500 font-bold">{user.username}</h2>
            <p className="text-secondary-500">{user.description}</p>
          </li>
        ))}
      </ul>
      <Link href="/register" className="text-blue-500 underline">Register</Link>
    </div>
  )
}
