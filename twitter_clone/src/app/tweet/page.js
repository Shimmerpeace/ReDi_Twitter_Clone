//app/tweet/page.js
"use client";
import { useState, useEffect } from "react";
import TweetCard from "@/components/TweetCard";
import TweetForm from "@/components/TweetForm";
import Link from "next/link";

export default function TweetsList() {
  const [tweets, setTweets] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // Normalize tweet to match display needs
  const normalizeTweet = (tweet) => ({
    id: tweet._id || tweet.id,
    content: tweet.content || "",
    twitterUser: tweet.twitterUser || "Anonymous",
    createdAt: tweet.createdAt,
  });

  // Fetch tweets from DB only
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const dbRes = await fetch("/api/tweets");
        const dbJson = await dbRes.json();
        const dbTweets = (dbJson.tweets || []).map(normalizeTweet);
        setTweets(dbTweets);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTweets();
  }, []);

  // Handle new tweet submission
  const handlePostSubmit = async ({ content }) => {
    try {
      const res = await fetch("/api/tweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error("Failed to post tweet");
      const result = await res.json();
      const newTweet = normalizeTweet(result.tweet);
      setTweets((prev) => [newTweet, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Failed to post tweet");
    }
  };

  return (
    <>
      <TweetForm
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handlePostSubmit}
      />

      <button
        className="w-full bg-black text-white rounded-[10px] font-bold py-2 px-4 mt-4 mb-4 cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        Make a post!
      </button>
      <div>
        {tweets.map((tweet) => (
          <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
            <TweetCard tweet={tweet} />
          </Link>
        ))}
      </div>
    </>
  );
}
