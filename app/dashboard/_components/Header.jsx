"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React, { useRef } from "react";

const Header = () => {
  const rendered = useRef(false);
  if (rendered.current) return null; // Prevents second render
  rendered.current = true;

  return (
    <header className="fixed top-0 right-0 w-full md:w-[82%] bg-red shadow-md p-3 md:p-4 rounded-lg flex flex-wrap justify-between items-center z-50">
      {/* Logo Section */}
      <div className="flex items-center gap-2 md:gap-3">
        <Image
          src="/logo.avif"
          width={50}
          height={45}
          alt="Logo"
          className="rounded-[10px] shadow-md"
        />
        <h1 className="text-lg md:text-xl font-semibold text-gray-700 whitespace-nowrap">
          AI Course Generator
        </h1>
      </div>

      {/* User Profile Button */}
      <div className="flex items-center">
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
