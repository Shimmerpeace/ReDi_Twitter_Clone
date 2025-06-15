'use client';

import { useEffect, useState } from 'react';

// Helper to get JWT from localStorage (or cookie if you prefer)
function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export default function TweetsPage() {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState('');
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch tweets
  useEffect(() => {
    setLoading(true);
    fetch('/api/tweets')
      .then(res => res.json())
      .then(data => {
        setTweets(data.tweets || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch tweets');
        setLoading(false);
      });
  }, []);

  // Post a tweet
  async function handleTweetSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!newTweet.trim()) {
      setError('Tweet cannot be empty');
      return;
    }
    setPosting(true);
    try {
      const token = getToken();
      const res = await fetch('/api/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ content: newTweet }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to post tweet');
      } else {
        setTweets([data.tweet, ...tweets]);
        setNewTweet('');
        setSuccess('Tweet posted!');
      }
    } catch (err) {
      setError('Failed to post tweet');
    }
    setPosting(false);
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6">Tweets Feed</h1>

      {/* Tweet Composer */}
      <form onSubmit={handleTweetSubmit} className="mb-6">
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={3}
          maxLength={280}
          placeholder="What's happening?"
          value={newTweet}
          onChange={e => setNewTweet(e.target.value)}
          disabled={posting}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={posting}
        >
          {posting ? 'Posting...' : 'Tweet'}
        </button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        {success && <div className="text-green-600 mt-2">{success}</div>}
      </form>

      {/* Tweets List */}
      {loading ? (
        <div>Loading tweets...</div>
      ) : (
        <ul>
          {tweets.length === 0 && <li>No tweets yet.</li>}
          {tweets.map(tweet => (
            <li key={tweet._id} className="border-b py-3">
              <div className="font-semibold">{tweet.twitterUser}</div>
              <div>{tweet.content}</div>
              <div className="text-xs text-gray-500">
                {new Date(tweet.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}









'use client';

import { useEffect, useState } from 'react';

export default function TweetsPage() {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState('');
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch tweets
  useEffect(() => {
    setLoading(true);
    fetch('/api/tweets')
      .then(res => res.json())
      .then(data => {
        setTweets(data.tweets || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch tweets');
        setLoading(false);
      });
  }, []);

  // Post a tweet
  async function handleTweetSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!newTweet.trim()) {
      setError('Tweet cannot be empty');
      return;
    }
    setPosting(true);
    try {
      const res = await fetch('/api/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // No Authorization header needed; JWT is sent via HttpOnly cookie
        },
        body: JSON.stringify({ content: newTweet }),
        credentials: 'include', // Ensure cookies are sent with the request
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to post tweet');
      } else {
        setTweets([data.tweet, ...tweets]);
        setNewTweet('');
        setSuccess('Tweet posted!');
      }
    } catch (err) {
      setError('Failed to post tweet');
    }
    setPosting(false);
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6">Tweets Feed</h1>

      {/* Tweet Composer */}
      <form onSubmit={handleTweetSubmit} className="mb-6">
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={3}
          maxLength={280}
          placeholder="What's happening?"
          value={newTweet}
          onChange={e => setNewTweet(e.target.value)}
          disabled={posting}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={posting}
        >
          {posting ? 'Posting...' : 'Tweet'}
        </button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        {success && <div className="text-green-600 mt-2">{success}</div>}
      </form>

      {/* Tweets List */}
      {loading ? (
        <div>Loading tweets...</div>
      ) : (
        <ul>
          {tweets.length === 0 && <li>No tweets yet.</li>}
          {tweets.map(tweet => (
            <li key={tweet._id} className="border-b py-3">
              <div className="font-semibold">{tweet.twitterUser}</div>
              <div>{tweet.content}</div>
              <div className="text-xs text-gray-500">
                {new Date(tweet.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}