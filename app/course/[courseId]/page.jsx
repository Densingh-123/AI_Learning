"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useUser, UserButton } from "@clerk/nextjs";
import { FaEdit, FaPlay, FaExternalLinkAlt, FaBook, FaClock, FaUser, FaLayerGroup, FaYoutube, FaCopy, FaLightbulb, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GiGraduateCap, GiBookshelf } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

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

const CourseLayout = ({ params }) => {
  const { courseId } = params; // Directly access params.courseId

  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers
  const [showHints, setShowHints] = useState({}); // Track hints visibility
  const [expandedChapters, setExpandedChapters] = useState({}); // Track expanded chapters

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const docRef = doc(db, "courses", courseId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCourseData(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching course data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  // Handle answer selection
  const handleAnswerSelect = (questionIndex, option, correctAnswer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option === correctAnswer ? "correct" : "incorrect",
    }));
  };

  // Handle hint click
  const handleHintClick = (questionIndex) => {
    setShowHints((prev) => ({
      ...prev,
      [questionIndex]: !prev[questionIndex],
    }));
  };

  // Handle chapter expand/collapse
  const handleChapterToggle = (chapterIndex) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterIndex]: !prev[chapterIndex],
    }));
  };

  if (loading) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  if (!courseData) {
    return <div className="text-white text-center py-10">Course not found.</div>;
  }

  // Generate a random banner image path
  const getRandomBanner = () => `/banner${Math.floor(Math.random() * 10) + 1}.jpg`;

  // Copy code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      {/* Cover Image with User Profile */}
      <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={courseData.coverImage || getRandomBanner()}
            alt="Course Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          {/* Overlay with 0.2 opacity black */}
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
        <div className="absolute inset-0 flex items-center ml-30">
        <div className="text-black font-[family-name:var(--font-geist-mono)]">
            <h1 className="text-7xl font-bold">{courseData.courseName}</h1>
            <p className="text-xl mt-4">{courseData.category}</p>
            <p className="text-lg mt-2">Instructor: {courseData.userFullName}</p>
          </div>
        </div>
        <div className="absolute bottom-6 right-6 w-20 h-20 border-r-4 border-gray-400 rounded-full shadow-lg flex items-center justify-center bg-white">
          <UserButton afterSignOutUrl="/" className="w-16 h-16" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-4xl font-bold text-gray-800">{courseData.courseName}</h1>
            <button className="ml-4 text-xl text-blue-500 hover:text-blue-700">
              <FaEdit />
            </button>
          </div>
        </div>

        {/* Course Description and Expected Outcomes */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <p className="text-xl font-semibold mb-4 flex items-center">
            <GiGraduateCap className="mr-2 text-blue-500" /> Course Description
          </p>
          <p className="text-gray-600 mb-4">{courseData.courseDescription}</p>
          <p className="text-xl font-semibold mb-4 flex items-center">
            <GiGraduateCap className="mr-2 text-blue-500" /> Expected Outcomes
          </p>
          <p className="text-gray-600">{courseData.expectedOutcomes}</p>
        </div>

        {/* Course Details */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <p className="text-xl font-semibold mb-4 flex items-center">
            <GiGraduateCap className="mr-2 text-blue-500" /> Course Details
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <MdOutlineSignalCellularAlt className="text-blue-500" />
              <p><span className="font-semibold">Category:</span> {courseData.category}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaClock className="text-blue-500" />
              <p><span className="font-semibold">Duration:</span> {courseData.duration}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaLayerGroup className="text-blue-500" />
              <p><span className="font-semibold">Chapters:</span> {courseData.numberOfChapters}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaUser className="text-blue-500" />
              <p><span className="font-semibold">Instructor:</span> {courseData.userFullName}</p>
            </div>
          </div>
        </div>

        {/* Chapters Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <GiBookshelf className="mr-2 text-blue-500" /> Chapters
          </h2>
          <ul className="space-y-4">
            {courseData.generatedContent?.Chapters?.map((chapter, index) => (
              <li 
                key={index} 
                className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleChapterToggle(index)}
                >
                  <div className="flex items-center">
                    <span className="bg-blue-500 text-white font-semibold w-8 h-8 flex items-center justify-center rounded-full mr-3 shadow-md">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{chapter.ChapterName}</h3>
                  </div>
                  <div>
                    {expandedChapters[index] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
                {expandedChapters[index] && (
                  <div className="mt-4">
                    <p className="text-gray-600 mb-3">{chapter.Content.DetailedExplanation}</p>

                    {/* Definitions */}
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-2">Definitions</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {chapter.Content?.Definitions?.map((definition, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                            <p className="text-lg font-semibold text-blue-600">{definition.Term}</p>
                            <p className="text-gray-600">{definition.Meaning}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Multiple Choice Questions */}
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-2">Multiple Choice Questions</h4>
                      <ul className="space-y-4">
                        {chapter.Content?.MultipleChoiceQuestions?.map((question, idx) => (
                          <li key={idx} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                            <p className="text-lg font-semibold text-gray-900">{question.Question}</p>
                            <ul className="mt-2 space-y-2">
                              {question.Options.map((option, optIdx) => (
                                <li
                                  key={optIdx}
                                  className={`p-3 rounded-md cursor-pointer transition-all duration-200 ${
                                    selectedAnswers[idx] === "correct" && option === question.Answer
                                      ? "border-2 border-green-500 bg-green-50"
                                      : selectedAnswers[idx] === "incorrect" && option !== question.Answer
                                      ? "border-2 border-red-500 bg-red-50"
                                      : "border border-gray-200 hover:bg-blue-50"
                                  }`}
                                  onClick={() => handleAnswerSelect(idx, option, question.Answer)}
                                >
                                  {option}
                                </li>
                              ))}
                            </ul>
                            <button
                              onClick={() => handleHintClick(idx)}
                              className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
                            >
                              <FaLightbulb className="mr-2" /> Hint
                            </button>
                            {showHints[idx] && (
                              <p className="mt-2 text-green-600">Correct Answer: {question.Answer}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Code Examples */}
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-2">Code Examples</h4>
                      <ul className="space-y-2">
                        {chapter.Content?.CodeExamples?.map((example, idx) => (
                          <li key={idx} className="text-gray-600">
                            <p className="font-semibold">{example.Title}</p>
                            <div className="relative">
                              <SyntaxHighlighter language="javascript" style={dracula}>
                                {example.Code}
                              </SyntaxHighlighter>
                              <button
                                onClick={() => copyToClipboard(example.Code)}
                                className="absolute top-2 right-2 p-2 bg-gray-700 rounded-md hover:bg-gray-600"
                              >
                                <FaCopy className="text-white" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* External References */}
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-2">External References</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {chapter.Content?.ExternalReferences?.map((reference, idx) => (
                          <div key={idx} className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                            <Image
                              src={`/banner${Math.floor(Math.random() * 10) + 1}.jpg`}
                              alt="Reference Banner"
                              width={300}
                              height={150}
                              className="w-full h-40 object-cover"
                            />
                            <a
                              href={reference}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-1 text-white font-semibold text-lg hover:bg-opacity-70"
                            >
                              Visit Link
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* YouTube Videos */}
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-2">YouTube Videos</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {chapter.Content?.YouTubeVideos?.map((video, idx) => (
                          <div key={idx} className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                            <Image
                              src={`/banner${Math.floor(Math.random() * 10) + 1}.jpg`}
                              alt="YouTube Video Banner"
                              width={300}
                              height={150}
                              className="w-full h-40 object-cover"
                            />
                            <a
                              href={video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg hover:bg-opacity-70"
                            >
                              Watch Video
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseLayout;