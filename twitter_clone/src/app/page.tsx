import NewTweet from "./newTweet/page";
//import Header from "@/components/Header";
import TweetsList from "@/app/tweet/page";
import TweetsPage from "@/app/tweets/page";

function Home() {
  return (
    <>
      <NewTweet />
      <TweetsList />
      <TweetsPage />
    </>
  );
}

export default Home;
//<Header />
