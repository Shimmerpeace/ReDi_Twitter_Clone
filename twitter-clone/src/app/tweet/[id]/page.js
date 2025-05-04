// app/tweet/[id]/page.js
// 📌 Fetches and displays details for a single tweet
import Link from "next/link";



async function getTweet(id) {
    const res = await fetch(`https://dummyjson.com/posts/${id}`);
    return res.json();
  }
  
  export default async function TweetDetail({ params }) {
    const tweet = await getTweet(params.id);
  
    return (
      <main>
        <h1>{tweet.title}</h1>
        <p>{tweet.body}</p>
        <p>
          👍 {tweet.reactions.likes} | 👎 {tweet.reactions.dislikes}
        </p>
        <p>Tags: {tweet.tags.join(", ")}</p>
        <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
          ← Back to Feed
        </Link>
      </main>
    );
  }