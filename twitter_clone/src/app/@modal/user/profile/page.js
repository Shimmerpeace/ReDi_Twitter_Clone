import Modal from "@/components/Modal";
import UsersPage from "@/users/page"; // your original profile page component (converted to client if needed)

export default function ModalCurrentUserProfile() {
  return (
    <Modal>
      <UsersPage />
    </Modal>
  );
}