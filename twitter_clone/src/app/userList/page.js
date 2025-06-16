import UserCard from "@/components/UserCard";

export default function UsersList({ users = [] }) {
  if (!users.length) {
    return <div>No users found.</div>;
  }
  return (
    <div>
      {users.map(user => <UserCard key={user._id} user={user} />)}
    </div>
  );
}