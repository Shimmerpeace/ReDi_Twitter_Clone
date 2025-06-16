"use client";
import { useState, useEffect } from "react";
import TweetCard from "@/components/TweetCard";
import TweetForm from "@/components/TweetForm";
import Link from "next/link";

export default function TweetsList({ twitterUser, content }) {
  const [tweets, setTweets] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // 1. Fetch from your local API endpoint
    fetch("/api/dummyPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ twitterUser, content }),
    }) // Fetch from your local proxy/api route
      .then((res) => res.json())
      .then((data) => {
        // Fetch from your DB and merge here if needed
        fetchTweetsFromDb().then((dbTweets) => {
          console.log(dbTweets);
          // Merge and set tweets
          const mergedTweets = [...dbTweets, ...data.posts];
          setTweets(mergedTweets);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [twitterUser, content]);

  const fetchTweetsFromDb = async () => {
    try {
      const res = await fetch("/api/tweets");
      if (!res.ok) throw new Error("Failed to fetch tweets from DB");
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const handlePostSubmit = async ({ twitterUser, content }) => {
    try {
      const res = await fetch("/api/tweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ twitterUser, content }),
      });
      if (!res.ok) throw new Error("Failed to post tweet");
      const newTweet = await res.json();
      // Add new tweet to the top of the list
      setTweets((prev) => [newTweet, ...prev]);
      console.log("New post:", content);
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
          <Link
            key={tweet.id || tweet._id}
            href={`/tweet/${tweet.id || tweet._id}`}
          >
            <TweetCard tweet={tweet} />
          </Link>
        ))}
      </div>
    </>
  );
}

/**
 const [tweets, setTweets] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
     // 1. Fetch from dummyjson.com
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => setTweets(data.posts));
  }, []);
 */
