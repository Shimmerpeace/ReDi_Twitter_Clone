import Modal from "@/components/Modal";
import UsersPage from "@/user/profile/page" // your original profile page component (converted to client if needed)

export default function ModalCurrentUserProfile() {
  return (
    <Modal>
      <UsersPage />
    </Modal>
  );
}