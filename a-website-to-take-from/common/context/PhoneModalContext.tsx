"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

interface PhoneModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const PhoneModalContext = createContext<PhoneModalContextValue | undefined>(
  undefined
);

export function PhoneModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <PhoneModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </PhoneModalContext.Provider>
  );
}

export function usePhoneModal(): PhoneModalContextValue {
  const ctx = useContext(PhoneModalContext);
  if (!ctx) {
    throw new Error("usePhoneModal must be used within PhoneModalProvider");
  }
  return ctx;
}
