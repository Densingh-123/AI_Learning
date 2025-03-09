"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useUser, UserButton } from "@clerk/nextjs";
import { FaEdit, FaPlay, FaExternalLinkAlt, FaBook, FaClock, FaUser, FaLayerGroup, FaYoutube } from "react-icons/fa";
import { GiGraduateCap, GiBookshelf } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineSignalCellularAlt } from "react-icons/md";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDcG8GK85f33oESJ2KBSnrsP-_XFukWhg",
  authDomain: "learning-e8ab0.firebaseapp.com",
  projectId: "learning-e8ab0",
  storageBucket: "learning-e8ab0.appspot.com",
  messagingSenderId: "400693672644",
  appId: "1:400693672644:web:cfd9e7a896dde90ceb6791",
  measurementId: "G-8Q37GTE26Z",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CourseLayout = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, "courses");
        const coursesSnapshot = await getDocs(coursesCollection);
        const coursesData = coursesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  if (courses.length === 0) {
    return <div className="text-white text-center py-10">No courses found.</div>;
  }

  // Generate a random banner image path
  const getRandomBanner = () => `/banner${Math.floor(Math.random() * 10) + 1}.jpg`;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">All Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow-md">
              <Image
                src={course.coverImage || getRandomBanner()}
                alt="Course Banner"
                width={400}
                height={200}
                className="rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-800">{course.courseName}</h2>
              <p className="text-gray-600 mb-4">{course.courseDescription}</p>
              <div className="flex items-center space-x-2">
                <MdOutlineSignalCellularAlt className="text-blue-500" />
                <p><span className="font-semibold">Category:</span> {course.category}</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaClock className="text-blue-500" />
                <p><span className="font-semibold">Duration:</span> {course.duration}</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaLayerGroup className="text-blue-500" />
                <p><span className="font-semibold">Chapters:</span> {course.numberOfChapters}</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaUser className="text-blue-500" />
                <p><span className="font-semibold">Instructor:</span> {course.userFullName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseLayout;