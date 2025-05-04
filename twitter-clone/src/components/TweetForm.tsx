"use client";
import React, { useState } from "react";

export default function TweetForm({ isOpen, onClose, onSubmit }) {
  const [tweetContent, setTweetContent] = useState("");
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tweetContent.trim()) {
      alert("Please enter some text!");
      return;
    }
    onSubmit(tweetContent);
    // TODO: Replace this with your posting logic (e.g., API call)
    alert(`Tweet posted: ${tweetContent}`);
    setTweetContent(""); // Clear textarea after submit
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <textarea
            name="tweetContent"
            id="content"
            placeholder="What's happening?"
            className="w-full bg-transparent border rounded p-4 mb-4"
            rows={3}
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full mt-2"
            disabled={!tweetContent.trim()}
          >
            Tweet
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
