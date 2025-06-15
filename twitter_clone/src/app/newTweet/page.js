import { makeSureDbIsReady } from "@/lib/dataBase";
import Tweet  from "@/models/Tweet.js";
import { CreateTweet } from "./create.js";

export default async function NewTweet() {
  await makeSureDbIsReady();

  const allTweet = await Tweet.find({});
  console.log({ allTweet });
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold my-4">Latest Tweet </h2>
      <CreateTweet />

      <h2 className="text-2xl font-bold my-4"> All Tweets</h2>
      {allTweet.map((tweet) => (
        <div key={tweet._id} className="grid grid-cols-2 max-w-sm">
          <span>User</span>
          <span>{tweet.twitterUser}</span>
          <span>Content</span>
          <span>{tweet.content}</span>
          <span>Likes</span>
          <span>{tweet.likes}</span>
          <span>Dislikes</span>
          <span>{tweet.dislikes}</span>
        </div>
      ))}
    </div>
  );
}
