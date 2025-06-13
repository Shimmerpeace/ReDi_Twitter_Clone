import Sidebar from "../components/Sidebar";
import FollowBar from "../components/FollowBar";
import NewTweet from "./newTweet/page"
//import Header from "@/components/Header";
import TweetsList from "@/app/tweet/page"

function Home() {
  return (
    <div className="h-screen bg-[linear-gradient(90deg,_#020024_0%,_#090979_15%,_#00d4ff_100%)]">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
         
          <Sidebar />
          <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
          
           
            <NewTweet />
            <TweetsList />
           
            
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
}

export default Home;
//<Header />
