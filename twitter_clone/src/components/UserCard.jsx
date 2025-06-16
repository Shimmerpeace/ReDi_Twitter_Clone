// User profile component
// /components/UserCard.jsx
import Link from "next/link";
import Image from "next/image";

export default function UserCard({ user }) {
  if (!user) return null; // or a loading spinner

  return (
    <Link
      href={`/user/profile/${user._id}`}
      className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded"
    >
      <Image
        src={user.image || "/default-image.png"}
        alt={user.username}
        width={80}
        height={80}
      />
      <h1>
        {user.name} (@{user.username})
      </h1>
      <h2>@{user.username}</h2>
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
      <p>Followers: {user.followers?.length ?? 0}</p>
      <p>Following: {user.following?.length ?? 0}</p>
    </Link>
  );
}
//<Link href={`/users/${user.username}`}>