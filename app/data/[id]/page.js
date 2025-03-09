"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ChapterPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chapterIndex = searchParams.get("chapterIndex");
  const courseData = JSON.parse(searchParams.get("courseData"));

  const chapter = courseData.generatedContent.Chapters[chapterIndex];

  if (!chapter) {
    return <div className="text-white text-center py-10">Chapter not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{chapter.ChapterName}</h1>
        <p className="text-xl mb-4">{chapter.Description}</p>

        <h2 className="text-2xl font-semibold mb-4">Exercises</h2>
        <div className="space-y-4">
          {chapter.Exercises?.CodeExamples?.map((example, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold">{example.Title}</h3>
              <pre className="bg-gray-100 p-2 rounded-md">
                <code>{example.Code}</code>
              </pre>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Definitions</h2>
        <div className="space-y-4">
          {chapter.Exercises?.Definitions?.map((definition, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold">{definition.Question}</h3>
              <p className="text-gray-600">{definition.Answer}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Multiple Choice Questions</h2>
        <div className="space-y-4">
          {chapter.Exercises?.MultipleChoice?.map((mcq, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold">{mcq.Question}</h3>
              <ul className="list-disc pl-6">
                {mcq.Options.map((option, idx) => (
                  <li key={idx} className="text-gray-600">{option}</li>
                ))}
              </ul>
              <p className="text-green-600 mt-2">Answer: {mcq.Answer}</p>
              <p className="text-gray-600">{mcq.Explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;