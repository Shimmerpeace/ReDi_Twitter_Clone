import { makeSureDbIsReady } from "@/lib/dataBase";
import User from "@/models/User";
import Image from "next/image";

export default async function UserProfileByIdPage({ params }) {
  await makeSureDbIsReady();
  const user = await User.findById(params.id).select("-password").lean();

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <h1>
        {user.name} (@{user.username})
      </h1>
      <Image
        src={user.image || "/default-avatar.png"}
        alt="Avatar"
        width={100}
      />
      <p>{user.bio}</p>
      <p>Followers: {user.followers.length}</p>
      <p>Following: {user.following.length}</p>
    </div>
  );
}
