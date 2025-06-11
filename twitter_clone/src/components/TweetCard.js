"use client";
import { useContext } from "react";
import { LikesContext } from "@/context/LikesContext";

export default function TweetCard({ tweet }) {
  const { likedTweets, toggleLike } = useContext(LikesContext);

  const { id, title, body, tags, reactions, views, twitterUser } = tweet;

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-all cursor-pointer bg-white">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-700">{body || tweet.tweetContent}</p>
      <p className="text-sm text-gray-500">By: {twitterUser}</p>
      {tags.length > 0 && <p>Tags: {tags.join(", ")}</p>}
      
      <p>
        <span>
          👍 {reactions.likes} | 👎 {reactions.dislikes}
        </span>{" "}
        <span>👁️{views}</span>
      </p>
    
      <button
        onClick={() => toggleLike(id)}
        className={`mt-2 px-4 py-2 rounded ${
          likedTweets.includes(id)
            ? "bg-red-500 text-white"
            : "bg-gray-200"
        }`}
      >
        {likedTweets.includes(id) ? "Unlike ❤️" : "Like ♡"}
      </button>
    </div>
  );
}
