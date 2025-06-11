// app/api/dummyPost/route.js
export default async function handler(req, res) {
  try {
    const dummyJsonRes = await fetch("https://dummyjson.com/posts");
    const dummyJsonData = await dummyJsonRes.json();
    res.status(200).json(dummyJsonData);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}