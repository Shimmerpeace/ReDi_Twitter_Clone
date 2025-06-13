"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with session user id or fetch from session
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile?id=USER_ID"); // Replace USER_ID with actual value
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error(error)
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found or not authenticated.</div>;

  return (
    <div>
      <h1>
        {user.name} (@{user.username})
      </h1>
      <Image
        src={user.image || "/default-avatar.png"}
        alt="user image"
        width={100}
      />
      <p>{user.bio}</p>
      <p>Followers: {user.followers.length}</p>
      <p>Following: {user.following.length}</p>
    </div>
  );
}
