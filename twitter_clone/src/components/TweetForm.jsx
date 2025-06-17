"use client";
import React, { useState } from "react";

export default function TweetForm({ isOpen, onClose, onSubmit }) {
  const [content, setContent] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("Please enter some text!");
      return;
    }
    onSubmit({ content });
    setContent(""); // Clear textarea after submit
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <textarea
            name="content"
            id="content"
            placeholder="What's happening?"
            className="w-full bg-transparent border rounded p-4 mb-4"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 h-[50px] bg-[#50b7f5] rounded-[20px] text-white font-bold text-[18px] border-none mt-5 cursor-pointer transition-colors duration-200 hover:bg-[#1da1f2]"
            disabled={!content.trim()}
          >
            Tweet
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 h-[50px] bg-[#50b7f5] rounded-[20px] text-white font-bold text-[18px] border-none mt-5 cursor-pointer transition-colors duration-200 hover:bg-[#1da1f2] ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
