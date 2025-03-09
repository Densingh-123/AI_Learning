"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { FaBook, FaInfoCircle } from "react-icons/fa";

const TopicDescription = ({ onInputChange }) => {
  return (
    <div className="mx-auto max-w-3xl bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-12 border border-gray-200 my-10 transition-all duration-300">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
        <FaBook className="text-purple-700 drop-shadow-md" />
        Create Your Course
      </h2>

      {/* Topic Input */}
      <div className="flex flex-col gap-4 mb-8">
        <label className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <FaInfoCircle className="text-blue-600" />
          Topic for your course:
        </label>
        <div className="relative">
          <Input
            placeholder="e.g., Python, Java, DSA, Yoga..."
            className="p-4 pl-14 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 transition duration-300 w-full text-black placeholder-gray-500 shadow-md hover:shadow-lg focus:shadow-xl"
            onChange={(e) => onInputChange("topic", e.target.value)}
          />
          <FaBook className="absolute left-5 top-4 text-gray-500 text-lg" />
        </div>
      </div>

      {/* Course Description */}
      <div className="flex flex-col gap-4">
        <label className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <FaInfoCircle className="text-green-600" />
          Course Description (Optional):
        </label>
        <div className="relative">
          <Textarea
            placeholder="What do you want to include in your course?"
            className="p-4 pl-14 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 transition duration-300 w-full text-black placeholder-gray-500 shadow-md hover:shadow-lg focus:shadow-xl resize-none"
            onChange={(e) => onInputChange("description", e.target.value)}
          />
          <FaInfoCircle className="absolute left-5 top-4 text-gray-500 text-lg" />
        </div>
      </div>
    </div>
  );
};

export default TopicDescription;
