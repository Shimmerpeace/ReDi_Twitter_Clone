"use client";
import { useContext } from "react";
import { LikesContext } from "@/context/LikesContext";

export default function TweetCard({ tweet }) {
  const { likedTweets, toggleLike } = useContext(LikesContext);

  const { id, _id, content, twitterUser, createdAt } = tweet;
  const tweetId = id || _id;

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-all cursor-pointer bg-white">
      <p className="text-gray-700">{content}</p>
      <p className="text-sm text-gray-500">By: {twitterUser}</p>
      {createdAt && (
        <p className="text-xs text-gray-400">
          {new Date(createdAt).toLocaleString()}
        </p>
      )}
      <button
        onClick={() => toggleLike(tweetId)}
        className={`mt-2 px-4 py-2 rounded ${
          likedTweets.includes(tweetId)
            ? "bg-red-500 text-white"
            : "bg-gray-200"
        }`}
      >
        {likedTweets.includes(tweetId) ? "Unlike ❤️" : "Like ♡"}
      </button>
    </div>
  );
}
