// lib/api.js

export async function getTweets() {
    const res = await fetch('/api/tweets', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch tweets');
    return res.json();
  }