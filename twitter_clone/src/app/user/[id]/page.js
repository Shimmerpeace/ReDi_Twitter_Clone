// app/user/[id]/page.js
async function getUser(id) {
    const res = await fetch(`https://dummyjson.com/users/${id}`);
    return res.json();
  }
  
  export default async function UserProfile({ params }) {
    const user = await getUser(params.id);
    return (
      <main>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
      </main>
    );
  }