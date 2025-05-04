// app/page.js - Adding clickable tweets
import Link from "next/link";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import TweetCard from "@/components/TweetCard";
import TweetForm from "@/components/TweetForm";
import "@/styles/globals.css";

// app/page.js - Fetching tweets from DummyJSON API and displays them in the feed
async function getTweets() {
  const res = await fetch("https://dummyjson.com/posts");
  return res.json();
}

export default async function HomePage() {
  const tweets = await getTweets();

  return (
    <div className="min-h-screen p-8 ">
      <Sidebar />
      <Header />
      <main className="flex flex-col h-screen max-w-[1300px] mt-0 mr-[250px] mb-0 ml-[250px] gap-[32px] row-start-2 items-center justify-items-center sm:items-start">
        <div>
          <h1>📝 Latest Tweets</h1>
          <TweetForm />
          {tweets.posts.map((tweet) => (
            <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
              <TweetCard tweet={tweet} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

/* 

 
<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20">
      <main >
*/
/*
  return (
    <main>
      <h1>📝 Latest Tweets</h1>
      {tweets.posts.map((tweet) => (
        <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
          <TweetCard tweet={tweet} />
        </Link>
      ))}
    </main>
  );
}
/*
{tweets.posts.map((tweet) => (
  <p key={tweet.id}>{tweet.body}</p>
))}
  {tweets.posts.map((tweet) => (
          <li key={tweet.id}>{tweet.body}</li>
        ))}
  */
