"use client";
import Modal from "@/components/Modal";
import LoginPage from "@/auth/login";
import { useRouter } from "next/navigation";

export default function LoginModalPage() {
    const router = useRouter()
    return (
      <Modal isOpen={true} onClose={() => router.back()}>
        <LoginPage />
      </Modal>
    )
  }