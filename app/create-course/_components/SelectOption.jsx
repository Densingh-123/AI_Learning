import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaLevelUpAlt, FaClock, FaVideo, FaBookOpen } from "react-icons/fa";

const SelectOption = ({ onSelect }) => {
  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 bg-white shadow-lg rounded-2xl border border-gray-200 mx-4 md:mx-8 lg:mx-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Course Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Difficulty Level */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
            <FaLevelUpAlt className="text-purple-600" /> Difficulty Level
          </label>
          <Select onValueChange={(value) => onSelect("level", value)}>
            <SelectTrigger className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition duration-300">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course Duration */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
            <FaClock className="text-blue-600" /> Course Duration
          </label>
          <Select onValueChange={(value) => onSelect("duration", value)}>
            <SelectTrigger className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition duration-300">
              <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hours">1 Hour</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add Video */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
            <FaVideo className="text-red-500" /> Add Video
          </label>
          <Select onValueChange={(value) => onSelect("video", value)}>
            <SelectTrigger className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition duration-300">
              <SelectValue placeholder="Select Option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="YES">YES</SelectItem>
              <SelectItem value="NO">NO</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Number of Chapters */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700 flex items-center gap-2">
            <FaBookOpen className="text-green-600" /> No. of Chapters
          </label>
          <Input
            type="number"
            placeholder="Enter Number"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition duration-300"
            onChange={(e) => onSelect("chapters", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectOption;