import Modal from "@/components/Modal";
import UserProfileByIdPage from "@/user/profile/[id]/page";

export default function ModalUserProfileById({ params }) {
  return (
    <Modal>
      <UserProfileByIdPage params={params} />
    </Modal>
  );
}
//<UserProfileByIdPage params={{ id }} />