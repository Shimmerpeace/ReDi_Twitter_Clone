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





















// components/AuthModal.jsx
"use client";
import React from "react";

export default function AuthModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">×</button>
        {children}
      </div>
    </div>
  );
}




// components/Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
