import React from "react";
import Image from "next/image";
import { categories } from "../../_shared/CategoryList";

const SelectCategory = ({ onSelect, selectedCategory }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-8 lg:px-16 py-8">
      {categories.map((item, index) => (
        <div
          key={index}
          onClick={() => onSelect(item.name)}
          className={`flex flex-col items-center p-6 border-2 rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            selectedCategory === item.name
              ? "border-purple-500 bg-purple-50"
              : "border-gray-200 hover:border-purple-500 hover:bg-purple-50"
          }`}
        >
          {/* Category Icon */}
          <Image
            src={item.icon}
            width={80}
            height={80}
            alt={item.name}
            className="w-20 h-20 object-contain"
          />

          {/* Category Name */}
          <h2 className="mt-4 text-lg font-semibold text-gray-800 text-center">
            {item.name}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default SelectCategory;