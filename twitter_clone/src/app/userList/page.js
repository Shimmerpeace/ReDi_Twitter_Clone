import UserCard from "@/components/UserCard";

export default function UsersList({ users }) {
  return (
    <div>
      {users.map(user => <UserCard key={user._id} user={user} />)}
    </div>
  );
}