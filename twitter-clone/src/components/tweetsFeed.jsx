// components/TweetsFeed.jsx (Client Component)
"use client";

import { useState } from "react";
import Link from "next/link";
import TweetCard from "@/components/TweetCard";
import TweetForm from "@/components/TweetForm";

export default function TweetsFeed({ tweets }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handlePostSubmit = (tweetContent) => {
    // Handle the post submission (e.g., send to API or update state)
    console.log('New post:', tweetContent);
  };

  return (
    <>
      <TweetForm
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handlePostSubmit}
      />
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setModalOpen(true)}
      >
        New Tweet
      </button>
      {tweets.map((tweet) => (
        <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
          <TweetCard tweet={tweet} />
        </Link>
      ))}
    </>
  );
}
