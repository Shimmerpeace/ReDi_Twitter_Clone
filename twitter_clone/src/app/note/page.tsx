// app/page.js (Server Component)
"use client";
import { useState } from "react";

export default function Note() {
  const [tweetInput, setTweetInput] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  //   const [serverResponse, setServerResponse] = useState([]);

  const handleSubmit = async (e) => {
    // Prevents the default form submission behavior
    e.preventDefault();

    //Sends a POST request to the server at /api/echo.
    const res = await fetch("/api/note", {
      method: "POST", //Specifies the HTTP method as POST.
      headers: { "Content-Type": "application/json" }, //Tells the server that the request body is JSON.
      body: JSON.stringify({ tweet: tweetInput }), // Converts the object { tweet: input } into a JSON string and sends it as the request body.
    });

    const data = await res.json(); // waits for the server to send back JSON data and parses it
    // setResponse(data.message || data);
    setServerResponse(data.tweet); // updates the response state with the text property from the server’s reply.
    //setServerResponse((prev) => [...prev, data.tweet]);
    setTweetInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={tweetInput}
        onChange={(e) => setTweetInput(e.target.value)}
        placeholder="Make a tweet"
        className="rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
      <button
        type="submit"
        className="rounded-r-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2.5"
      >
        Post
      </button>

      {serverResponse && <div>{serverResponse}</div>}
    </form>
    /**
     * <ul>
        {serverResponse.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
     */
  );
}

/*

This code manages a text input and a response from a server in a React component.

When a form is submitted, it sends the input to /api/echo via POST.

It then displays the server’s response and clears the input field.
  */
