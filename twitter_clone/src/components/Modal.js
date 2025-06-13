"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

export default function Modal({ children }) {
  const router = useRouter();
  const overlayRef = useRef();

  const onDismiss = useCallback(() => {
    router.back(); // close modal by going back in history
  }, [router]);

  const onClick = (e) => {
    if (e.target === overlayRef.current) {
      onDismiss();
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={onClick}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          maxWidth: "600px",
          width: "100%",
          padding: "1rem",
        }}
      >
        {children}
      </div>
    </div>
  );
}