// CreateCourse.jsx
"use client";
import React, { useState } from "react";
import { HiMiniSquare3Stack3D, HiMiniSquare2Stack } from "react-icons/hi2";
import { FaLightbulb, FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import { useUser } from "@clerk/nextjs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation"; // Updated import for Next.js 13+

// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDcG8GK85f33oESJ2KBSnrsP-_XFukWhg",
  authDomain: "learning-e8ab0.firebaseapp.com",
  projectId: "learning-e8ab0",
  storageBucket: "learning-e8ab0.firebasestorage.app",
  messagingSenderId: "400693672644",
  appId: "1:400693672644:web:cfd9e7a896dde90ceb6791",
  measurementId: "G-8Q37GTE26Z",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Define CreateCourse component
const CreateCourse = () => {
  const { user } = useUser(); // Destructure user from useUser hook
  const router = useRouter(); // Moved inside the component
  console.log("User Full Name:", user?.fullName); // Log the user’s full name in the console

  // Stepper navigation options
  const StepperOptions = [
    { id: 1, name: "Category", icon: <HiMiniSquare3Stack3D /> },
    { id: 2, name: "Topic & Desc", icon: <FaLightbulb /> },
    { id: 3, name: "Options", icon: <HiMiniSquare2Stack /> },
  ];

  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userInput, setUserInput] = useState({
    category: "",
    topic: "",
    description: "",
    level: "",
    duration: "",
    chapters: "",
    video: "",
  });

  // Function to update user input dynamically
  const handleUserInput = (key, value) => {
    setUserInput((prev) => ({ ...prev, [key]: value }));
  };

  // Function to store the course in Firestore
  const storeCourseInDB = async (courseData) => {
    try {
      const docRef = await addDoc(collection(db, "courses"), courseData);
      console.log("Course successfully added to Firestore with ID: ", docRef.id);
      return docRef.id; // Return the document ID
    } catch (e) {
      console.error("Error adding course to Firestore: ", e);
      return null; // Return null if there's an error
    }
  };

  // Generate Course Layout with enhanced prompt and console output
  const GenerateCourseLayout = async () => {
    setLoading(true);

    // Enhanced prompt template
    const PROMPT_TEMPLATE = `Generate a comprehensive course tutorial based on the following details:
    - **Course Name**: ${userInput.courseName}
    - **Description**: ${userInput.courseDescription || "A detailed course about " + userInput.courseName + " covering all essential aspects."}
    - **Category**: ${userInput.category}
    - **Difficulty Level**: ${userInput.difficultyLevel}
    - **Duration**: ${userInput.duration}
    - **Number of Chapters**: ${userInput.numberOfChapters} (Ensure ALL chapters are generated)
    - **Add Video**: ${userInput.addVideo}
    - **Expected Outcomes**: ${userInput.expectedOutcomes || "Learners will gain a deep understanding of " + userInput.courseName + " with structured learning modules."}
    
    - **Each chapter must contain the following detailed structure**:
      1. **A deep explanation of the topic** (minimum 300-500 words) with real-world examples.
      2. **Key Definitions** (minimum 10) related to the topic.
      3. **Multiple-choice questions** (minimum 10) with answers and explanations.
      4. **5 Code Examples** with fully functional implementations, not just syntax.
      5. **5-10 External References** for further learning.
      6. **2 YouTube Videos** for visual learning.
      
    - **Format**: Provide a structured JSON output with all the chapters dynamically generated:
    
      \`\`\`json
      {
        "CourseName": "${userInput.courseName}",
        "Description": "${userInput.courseDescription}",
        "Category": "${userInput.category}",
        "DifficultyLevel": "${userInput.difficultyLevel}",
        "Duration": "${userInput.duration}",
        "NumberOfChapters": ${userInput.numberOfChapters},
        "AddVideo": ${userInput.addVideo},
        "ExpectedOutcomes": "${userInput.expectedOutcomes}",
        "Chapters": [
          {
            "ChapterName": "Chapter 1: [Title Here]",
            "Content": {
              "DetailedExplanation": "[Provide a very detailed 600-800 word explanation with real-world examples]",
              "Definitions": [
                { "Term": "Definition 1", "Meaning": "Explanation" },
                { "Term": "Definition 2", "Meaning": "Explanation" }
              ],
              "MultipleChoiceQuestions": [
                { "Question": "What is X?", "Options": ["A", "B", "C"], "Answer": "B", "Explanation": "Because..." }
              ],
              "CodeExamples": [
                { "Language": "JavaScript", "Code": "console.log('Example');", "Explanation": "This prints Example" }
              ],
              "ExternalReferences": [
                "https://example.com",
                "https://example2.com"
              ],
              "YouTubeVideos": [
                "https://www.youtube.com/watch?v=video1",
                "https://www.youtube.com/watch?v=video2"
              ]
            }
          },
          {
            "ChapterName": "Chapter 2: [Title Here]",
            "Content": { "DetailedExplanation": "[Another deep explanation]" }
          }
        ]
      }
      \`\`\`
    
    - **Additional Instructions**:
      - **Ensure ALL requested chapters are generated dynamically up to the specified number**.
      - **Provide highly detailed explanations as if answering a 10-mark question**.
      - **Avoid short answers—expand on each topic with clear examples and real-world applications**.
      - **Use structured JSON formatting with proper indentation for readability**.
      - **Ensure no missing chapters or incomplete information.**`;
    console.log("📢 Final Prompt Sent for Generation:\n", PROMPT_TEMPLATE);
    const result = await GenerateCourseLayout_AI.sendMessage(PROMPT_TEMPLATE);
    const generatedCourse = JSON.parse(result.response?.text());
    console.log("Generated Course Data:", generatedCourse);

    // Prepare the course data to store in Firestore
    const courseData = {
      userFullName: user?.fullName || "Anonymous", // Default to 'Anonymous' if no name exists
      courseName: userInput.topic,
      courseDescription: userInput.description,
      category: userInput.category,
      difficultyLevel: userInput.level,
      duration: userInput.duration,
      numberOfChapters: userInput.chapters,
      addVideo: userInput.video,
      expectedOutcomes: `Learners will gain a deep understanding of ${userInput.topic} with structured learning modules.`,
      createdAt: new Date(),
      generatedContent: generatedCourse, // Store the entire generated content
    };

    // Store the course in Firestore and get the document ID
    const courseId = await storeCourseInDB(courseData);

    // Redirect to the course details page
    if (courseId) {
      router.push(`/course/${courseId}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaCheckCircle className="text-green-500" /> Create Your Course
      </h2>

      <div className="flex items-center justify-center w-full px-6 md:px-10 lg:px-20">
        {StepperOptions.map((item, index) => (
          <div key={item.id} className="flex items-center">
            <div className="flex flex-col items-center w-[50px] md:w-[100px]">
              <div
                className={`p-4 rounded-full text-white transition-all duration-300 ${
                  activeIndex >= index ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                {item.icon}
              </div>
              <h2 className="hidden md:block text-xs md:text-sm text-gray-700 mt-2">
                {item.name}
              </h2>
            </div>
            {index !== StepperOptions.length - 1 && (
              <div
                className={`h-1 w-[50px] md:w-[100px] lg:w-[170px] rounded-full transition-all duration-300 ${
                  activeIndex > index ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full px-8 md:px-20 lg:px-44 mt-10">
        {activeIndex === 0 && (
          <SelectCategory
            onSelect={(category) => handleUserInput("category", category)}
            selectedCategory={userInput.category}
          />
        )}
        {activeIndex === 1 && <TopicDescription onInputChange={handleUserInput} />}
        {activeIndex === 2 && <SelectOption onSelect={(key, value) => handleUserInput(key, value)} />}
      </div>

      <div className="flex justify-between w-full max-w-lg mt-10">
        <Button
          disabled={activeIndex === 0}
          variant="outline"
          onClick={() => setActiveIndex(activeIndex - 1)}
          className="px-6 py-2 transition-all duration-300 disabled:opacity-50"
        >
          Previous
        </Button>
        {activeIndex < 2 ? (
          <Button
            onClick={() => setActiveIndex(activeIndex + 1)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white rounded-lg"
          >
            Next
          </Button>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                onClick={GenerateCourseLayout}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 transition-all duration-300 text-white rounded-lg"
              >
                Generate Course Layout
              </Button>
            </AlertDialogTrigger>
            {loading && (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <div className="flex flex-col items-center">
                    <img src={'/rocket.gif'} alt="Loading..." className="w-24 h-24" />
                    <AlertDialogTitle>Generating Course...</AlertDialogTitle>
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            )}
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default CreateCourse;