"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface PhoneAuthState {
  phone: string | null;
  sessionToken: string | null;
  isOpen: boolean;
  openPhoneModal: () => void;
  closePhoneModal: () => void;
  setAuth: (phone: string, token: string) => void;
  clearAuth: () => void;
}

const PhoneAuthModalContext = createContext<PhoneAuthState | null>(null);

export function PhoneAuthModalProvider({ children }: { children: ReactNode }) {
  const [phone, setPhone] = useState<string | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedPhone = localStorage.getItem("phone");
    const storedToken = localStorage.getItem("sessionToken");
    if (storedPhone) setPhone(storedPhone);
    if (storedToken) setSessionToken(storedToken);
  }, []);

  const openPhoneModal = () => setIsOpen(true);
  const closePhoneModal = () => setIsOpen(false);

  const setAuth = (p: string, token: string) => {
    setPhone(p);
    setSessionToken(token);
    localStorage.setItem("phone", p);
    localStorage.setItem("sessionToken", token);
    setIsOpen(false);
  };

  const clearAuth = () => {
    setPhone(null);
    setSessionToken(null);
    localStorage.removeItem("phone");
    localStorage.removeItem("sessionToken");
  };

  return (
    <PhoneAuthModalContext.Provider
      value={{ phone, sessionToken, isOpen, openPhoneModal, closePhoneModal, setAuth, clearAuth }}
    >
      {children}
    </PhoneAuthModalContext.Provider>
  );
}

export function usePhoneAuth() {
  const ctx = useContext(PhoneAuthModalContext);
  if (!ctx) throw new Error("usePhoneAuth must be used inside PhoneAuthModalProvider");
  return ctx;
}
