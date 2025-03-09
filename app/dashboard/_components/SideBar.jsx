"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";

function SideBar() {
  const path = usePathname(); // Get the current route

  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <HiOutlineHome size={24} />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <HiOutlineSquare3Stack3D size={24} />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <IoShieldCheckmarkSharp size={24} />,
      path: "/dashboard/upgrade",
    },
    {
      id: 4,
      name: "Logout",
      icon: <TbLogout size={24} />,
      path: "/",
    },
  ];

  return (
    <div className="fixed h-full w-64 bg-white shadow-lg p-5 flex flex-col z-40">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-5">
        <img
          src="/img1.avif"
          alt="Logo"
          className="w-24 h-24 rounded-full shadow-md p-5"
        />
      </div>

      <hr className="my-5 border-gray-300" />

      {/* Menu Items */}
      <ul className="space-y-2">
        {Menu.map((item) => {
          const isActive = path === item.path;

          return (
            <li key={item.id}>
              <a
                href={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-500 text-white font-semibold shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="text-lg">{item.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;