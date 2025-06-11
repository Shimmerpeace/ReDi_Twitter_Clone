"use client";

import { redirect } from "next/navigation";

export function CreateTweet() {
  return (
    <form onSubmit={submit}>
      <input
        className="input"
        type="text"
        name="user"
        defaultValue="user"
      />
      <input
        className="input"
        type="text"
        name="content"
        defaultValue="What's happening?"
      />
      
      <button className="btn">Send</button>
    </form>
  );
}
const submit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const twitterUser = data.get("user");
  const content = data.get("content");
 

  const response = await fetch("/api/tweets", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ twitterUser, content }),
  });
  const result = await response.json();
  console.log(result);
  redirect("/tweets");
};