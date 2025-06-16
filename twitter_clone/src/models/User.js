// models/User.js
//import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    username: {
      type: String,
      trim: true,
      maxlength: 30,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    emailVerified: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    bio: {
      type: String,
      maxlength: 160,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
     avatar: {
      type: String,
      default: "",
    },
    
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);
/*
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
   this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
*/
export default mongoose.models.User || mongoose.model("User", UserSchema);

