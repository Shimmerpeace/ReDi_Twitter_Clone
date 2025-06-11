//app/tweet/page.js
"use client";
import { useState, useEffect } from "react";
import TweetCard from "@/components/TweetCard";
import TweetForm from "@/components/TweetForm";
import Link from "next/link";

export default function TweetsList() {
  const [tweets, setTweets] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // Normalize all tweets to a common shape
  const normalizeTweet = (tweet) => ({
    id: tweet.id || tweet._id,
    title: tweet.title || tweet.tweetContent || "",
    body: tweet.body || "",
    tags: tweet.tags || [],
    reactions:
      typeof tweet.reactions === "object"
        ? tweet.reactions
        : { likes: tweet.reactions || 0, dislikes: 0 },
    views: tweet.views || 0,
    twitterUser: tweet.twitterUser || "Anonymous",
  });

  // Fetch tweets from both sources and merge
  useEffect(() => {
    const fetchAllTweets = async () => {
      try {
        // Fetch dummy posts
        const dummyRes = await fetch("/api/dummyPost", { method: "GET" });
        const dummyData = await dummyRes.json();
        const dummyPosts = dummyData.posts.map(normalizeTweet);

        // Fetch DB tweets
        const dbRes = await fetch("/api/tweets");
        const dbJson = await dbRes.json();
        const dbTweets = (dbJson.data || []).map(normalizeTweet);

        // Merge and set
        setTweets([...dbTweets, ...dummyPosts]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAllTweets();
  }, []);

  // Handle new tweet submission
  const handlePostSubmit = async ({ twitterUser, tweetContent }) => {
    try {
      const res = await fetch("/api/tweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ twitterUser, tweetContent }),
      });
      if (!res.ok) throw new Error("Failed to post tweet");
      const result = await res.json();
      const newTweet = normalizeTweet(result.data);
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
