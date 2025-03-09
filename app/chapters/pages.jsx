import React from 'react';
import Link from 'next/link';
import { FaEdit, FaClock, FaPlay, FaLayerGroup, GiGraduateCap, GiBookshelf, MdOutlineSignalCellularAlt } from 'react-icons/all';

const CourseDetails = ({ courseData }) => {
  return (
    <div>
      {/* Course Name and Edit Button */}
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
            {/* <FaUser className="text-blue-500" /> */}
            {/* <p><span className="font-semibold">Instructor:</span> {courseData.userFullName}</p> */}
          </div>
        </div>
      </div>

      {/* Chapters Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        {/* Heading with Icon */}
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <GiBookshelf className="mr-2 text-blue-500" /> Chapters
        </h2>

        <ul className="space-y-4">
          {courseData.generatedContent?.Chapters?.map((chapter, index) => (
            <li 
              key={index} 
              className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Flex container for chapter number and name */}
              <div className="flex items-center mb-2">
                {/* Number Badge */}
                <span className="bg-blue-500 text-white font-semibold w-8 h-8 flex items-center justify-center rounded-full mr-3 shadow-md">
                  {index + 1}
                </span>

                {/* Chapter Name */}
                <h3 className="text-lg font-semibold text-gray-900">{chapter?.ChapterName}</h3>
              </div>

              {/* Chapter Description */}
              <p className="text-gray-600 mb-3">{chapter.About}</p>

              {/* Flex container for Start Chapter button and Duration */}
              <div className="flex items-center justify-between mt-3">
                {/* Start Chapter Button */}
                <Link
                  href={{
                    pathname: `/data/${courseData.courseId}`,
                    query: { chapterIndex: index, courseData: JSON.stringify(courseData) },
                  }}
                >
                  <button className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition">
                    <FaPlay className="mr-2" /> Start Chapter
                  </button>
                </Link>

                {/* Duration */}
                <p className="text-gray-700 flex items-center">
                  <FaClock className="text-blue-500 mr-1" />
                  <span className="font-semibold">{chapter.Duration}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetails;