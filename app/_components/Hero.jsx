"use client";

import React from "react";
import { useRouter } from "next/navigation";

function Hero() {
  const router = useRouter();

  return (
    <div className="h-screen w-full">
      <section
        className="relative h-full bg-[url(https://png.pngtree.com/thumb_back/fh260/background/20230903/pngtree-online-education-and-learning-apps-for-android-and-ios-image_13202566.jpg)] bg-cover bg-center bg-no-repeat"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-900/80 sm:bg-transparent sm:bg-gradient-to-r sm:from-gray-900 sm:to-gray-900/30"></div>

        {/* Content */}
        <div className="relative flex h-full items-center justify-center px-6 text-center sm:text-left lg:px-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              AI Course Generator
              <span className="block text-blue-300">
                Custom Learning Path, Powered By AI
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-200 sm:text-xl">
              Unlock Personalized Education with AI-driven Course Creation.
              Tailor Your Learning Journey to fit your unique goals.
            </p>

            {/* Button */}
            <div className="mt-8">
              <button
                onClick={() => router.push("/dashboard")}
                className="rounded-lg bg-blue-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-2xl focus:ring-4 focus:ring-rose-400 focus:outline-none"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
