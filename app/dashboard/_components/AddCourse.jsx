"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { MdAddTask } from "react-icons/md";
import AllCourse from '../../AllCourse/page'
const AddCourse = () => {
  const { user } = useUser();

  return (
    <div className="h-[600px] overflow-hidden relative">
      <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-xl p-4 w-full max-w-2xl mx-auto absolute top-0 left-0 right-0">
        {/* User Greeting & Description */}
        
        <div className="flex flex-col mb-4 md:mb-0">
          <h2 className="text-xl font-semibold text-gray-800 font-[family-name:var(--font-geist-mono)]">
            Hello, <span className="text-blue-600">{user?.fullName}</span>
          </h2>
          <p className="text-gray-600 text-sm font-[family-name:var(--font-geist-mono)]">
            Create a new AI-powered course, share it with friends, and learn from it.
          </p>
        </div>

        {/* Create Course Button */}
        <Link href={'/create-course'}>
          <Button className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300">
            <MdAddTask className="text-lg" />
            Create AI Course
          </Button>
        </Link>
        {/* <AllCourse/> */}
      </div>
    </div>
  );
};

export default AddCourse;