"use client"
import { useState } from "react";

export default function TweetForm() {
  const [tweetContent, setTweetContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tweetContent.trim()) {
      alert("Please enter some text!");
      return;
    }
    // TODO: Replace this with your posting logic (e.g., API call)
    alert(`Tweet posted: ${tweetContent}`);
    setTweetContent(""); // Clear textarea after submit
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-b">
      <textarea
        name="tweetContent"
        id="content"
        placeholder="What's happening?"
        className="w-full bg-transparent border rounded"
        rows={3}
        value={tweetContent}
        onChange={(e) => setTweetContent(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-full mt-2"
        disabled={!tweetContent.trim()}
      >
        Tweet
      </button>
    </form>
  );
}
