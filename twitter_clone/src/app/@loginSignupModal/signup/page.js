"use client";
import Modal from "@/components/Modal";
import SignUpPage from "@/auth/signup";
import { useRouter } from "next/navigation";

export default function SignUpModalPage() {
    const router = useRouter()
    return (
      <Modal isOpen={true} onClose={() => router.back()}>
        <SignUpPage />
      </Modal>
    )
  }