//app/user/profile/[id]/page.jsx

import UserCard from "@/components/UserProfile";

async function getUser(id) {
  const res = await fetch(`/api/user/profile/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function UserProfileByIdPage({ params }) {
  const user = await getUser(params.id);
  if (!user) return <div>User not found</div>;
  return <UserCard user={user} />;
}

