// components/TweetCard.js
// 📌 Displays a single tweet with likes, hashtags, and user info

export default function TweetCard({ tweet }) {
    return (
      <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-all cursor-pointer bg-white">
        <h3 className="text-lg font-bold">{tweet.title}</h3>
        <p>{tweet.body}</p>
        <p>
          👍 {tweet.reactions.likes} | 👎 {tweet.reactions.dislikes}
        </p>
        <p>Tags: {tweet.tags.join(", ")}</p>
      </div>
    );
  }
 //  