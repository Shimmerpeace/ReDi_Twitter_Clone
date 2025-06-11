'use client'
import { createContext, useState } from "react";

export const LikesContext = createContext();

export function LikesProvider({ children }) {
  const [likedTweets, setLikedTweets] = useState([]);

  const toggleLike = (tweetId) => {
    setLikedTweets((prevLikes) =>
      prevLikes.includes(tweetId)
        ? prevLikes.filter((id) => id !== tweetId)
        : [...prevLikes, tweetId]
    );
  };

  return (
    <LikesContext.Provider value={{ likedTweets, toggleLike }}>
      {children}
    </LikesContext.Provider>
  );
}