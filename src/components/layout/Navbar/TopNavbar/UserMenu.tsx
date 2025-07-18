"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    setIsOpen(false);
    signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return (
      <div className="p-1">
        <div className="w-[22px] h-[22px] bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  if (!session) {
    return (
      <Link href="/auth/signin" className="p-1">
        <Image
          priority
          src="/icons/user.svg"
          height={100}
          width={100}
          alt="user"
          className="max-w-[22px] max-h-[22px]"
        />
      </Link>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 flex items-center space-x-2"
      >
        <Image
          priority
          src="/icons/user.svg"
          height={100}
          width={100}
          alt="user"
          className="max-w-[22px] max-h-[22px]"
        />
        <span className="hidden sm:block text-sm font-medium">
          {session.user?.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                {session.user?.name}
              </p>
              <p className="text-sm text-gray-500">{session.user?.email}</p>
            </div>
            
            <Link
              href="/account"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              My Account
            </Link>
            
            <Link
              href="/account/orders"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              My Orders
            </Link>
            
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Profile Settings
            </Link>
            
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
