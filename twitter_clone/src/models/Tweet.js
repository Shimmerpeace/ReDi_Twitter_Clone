import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema({
  twitterUser: {
    type: String,
    required: true,
  },
  tweetContent: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// we have to define it this way because of hot reloading

/* Tweet = mongoose.models.Tweet ?? mongoose.model("Tweet", TweetSchema);
export default Tweet;
*/

export default mongoose.models.Tweet || mongoose.model('Tweet', TweetSchema);

//export  let Tweet = mongoose.models.Tweet ?? mongoose.model("Tweet", TweetSchema); 
// export default mongoose.models.Tweet ?? mongoose.model("Tweet", TweetSchema);
// export default mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema);