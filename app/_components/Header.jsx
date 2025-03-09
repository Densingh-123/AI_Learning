"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-6 py-4 shadow-md h-20 bg-white">
      {/* Logo */}
      <Image 
        src="/logo.avif" 
        width={120} 
        height={50} 
        alt="logo" 
        className="h-auto w-auto max-h-16 object-contain"
      />

      {/* Button */}
      <Button 
        onClick={() => router.push("/dashboard")}
        className="px-6 py-2 rounded-lg bg-gray-600 text-white font-semibold shadow-md transition-all duration-300 hover:bg-gray-700 hover:shadow-lg focus:ring-4 focus:ring-gray-400 focus:outline-none"
      >
        Get Started
      </Button>
    </div>
  );
}

export default Header;
