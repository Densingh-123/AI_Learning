import React from 'react'
import AllCourses from '../../AllCourse/page'

export default function ExplorePage() {
  return (
    <div>
    <div className="p-6 mt-20 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold mb-2">Welcome to the Explore Section!</h1>
        <p className="text-xl font-light">Discover amazing courses and start learning today!</p>
      </div>
    </div>
    <AllCourses />
    </div>
  );
}
