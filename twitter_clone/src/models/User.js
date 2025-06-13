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

/**
 A field named password in a schema usually represents the 
 raw password (for input), while passwordHash represents the 
 securely hashed version of that password (for storage). 
 In practice, for security, only the passwordHash should be stored,
  and the plaintext password should never be persisted in the 
  database.

  password (in a schema):

Typically refers to the plaintext (unencrypted) password that a user enters during registration or login.

Should never be stored directly in the database due to security risks.

passwordHash (in a schema):

Refers to the result of applying a cryptographic hash function (like bcrypt, Argon2, or PBKDF2) to the plaintext password, often combined with a unique salt.

The passwordHash is what is actually stored in the database, not the original password.

It is designed to be irreversible, so even if the database is compromised, attackers cannot easily retrieve the original password
 */
