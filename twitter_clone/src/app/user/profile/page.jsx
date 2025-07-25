//Server Component ((recommended for SEO and performance)if you want server-side fetching)
//If you want to fetch users on the server , do not use hooks.
//app/user/profile/page.jsx

import Link from "next/link";
import { cookies, headers } from "next/headers";

async function getUser() {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const cookie = cookies().toString(); // Get cookies as string

  const res = await fetch(`${protocol}://${host}/api/user/profile`, {
    cache: "no-store",
    headers: {
      cookie, // Forward cookies
    },
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export default async function UsersPage() {
  const { users } = await getUser();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            <Link href={`/user/profile/${u._id}`}>
              {u.name} (@{u.username})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
