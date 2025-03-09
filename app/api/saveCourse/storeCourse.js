// Function to store the course in Firestore
const storeCourseInDB = async (courseData) => {
    try {
      // Validate and sanitize data before storing
      const sanitizedCourseData = {
        userFullName: courseData.userFullName || "Anonymous", // Default to 'Anonymous' if no name exist
        courseName: courseData.courseName || "Untitled Course", // Default course name if missing
        courseDescription: courseData.courseDescription || "No description provided", // Default description if missing
        category: courseData.category || "General", // Default category if missing
        difficultyLevel: courseData.difficultyLevel || "Beginner", // Default level if missing
        duration: courseData.duration || "N/A", // Default duration if missing
        numberOfChapters: courseData.numberOfChapters || 0, // Default to 0 chapters if missing
        addVideo: courseData.addVideo || "No", // Default video status if missing
        createdAt: new Date(),
      };
  
      // Ensure userEmail is set to a valid value
      if (!sanitizedCourseData.userEmail || sanitizedCourseData.userEmail === "noemail@domain.com") {
        console.error("User email is required and should not be empty.");
        return; // Exit if the email is invalid
      }
  
      // Make sure the sanitized data is valid before sending to Firestore
      const docRef = await addDoc(collection(db, "courses"), sanitizedCourseData);
      console.log("Course successfully added to Firestore with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding course to Firestore: ", e);
    }
  };
  