const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

   export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a course tutorial on following  Detail with feild CourseName ,Description along with chaper name ,about,duration ,category :'Programming ' ,Topic:'java ',Level:'Advanced ' ,Duration:'3 hours',No Of Chapters :10, in json format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"CourseName\": \"Advanced Java Programming\",\n  \"Description\": \"A deep dive into advanced concepts and techniques in Java programming, suitable for experienced developers.\",\n  \"Category\": \"Programming\",\n  \"Topic\": \"Java\",\n  \"Level\": \"Advanced\",\n  \"Duration\": \"30 hours\",\n  \"NoOfChapters\": 10,\n  \"Chapters\": [\n    {\n      \"ChapterName\": \"Concurrency and Multithreading\",\n      \"About\": \"Exploring advanced techniques for managing concurrency and multithreading in Java, including thread pools, atomic variables, and concurrent data structures.\",\n      \"Duration\": \"3 hours\"\n    },\n    {\n      \"ChapterName\": \"Java Collections Framework Deep Dive\",\n      \"About\": \"In-depth examination of the Java Collections Framework, focusing on performance considerations, custom implementations, and advanced usage patterns.\",\n      \"Duration\": \"3 hours\"\n    },\n    {\n      \"ChapterName\": \"Java I/O and NIO\",\n      \"About\": \"Advanced techniques for input/output operations in Java, including the New I/O (NIO) API for non-blocking I/O and memory mapping.\",\n      \"Duration\": \"3 hours\"\n    },\n    {\n      \"ChapterName\": \"Reflection and Annotations\",\n      \"About\": \"Utilizing reflection to inspect and manipulate classes and objects at runtime, and leveraging annotations for code generation and metadata.\",\n      \"Duration\": \"3 hours\"\n    },\n    {\n      \"ChapterName\": \"Garbage Collection and Performance Tuning\",\n      \"About\": \"Understanding Java garbage collection algorithms and techniques for optimizing Java application performance.\",\n      \"Duration\": \"3 hours\"\n    },\n    {\n      \"ChapterName\": \"Design Patterns in Java\",\n      \"About\": \"Applying commonly used design patterns in Java projects to improve code maintainability, reusability, and scalability.\",\n      \"Duration\": \"3 hours\"\n    },\n    {\n      \"ChapterName\": \"JVM Internals\",\n      \"About\": \"A detailed look into the inner workings of the Java Virtual Machine (JVM), including class loading, bytecode execution, and memory management.\",\n      \"Duration\": \"3 hours\"\n    },\n    {\n      \"ChapterName\": \"Advanced Networking with Sockets\",\n      \"About\": \"Building sophisticated network applications using sockets and advanced networking techniques in Java.\",\n      \"Duration\": \"3 hours\"\n    },\n    {\n      \"ChapterName\": \"Java Persistence API (JPA) - Advanced Topics\",\n      \"About\": \"Delving into advanced JPA features such as caching, lazy loading, and performance optimization for database interactions.\",\n      \"Duration\": \"3 hours\"\n    },\n    {\n      \"ChapterName\": \"Testing and Debugging Advanced Java Applications\",\n      \"About\": \"Strategies and tools for testing and debugging complex Java applications, including unit testing, integration testing, and profiling.\",\n      \"Duration\": \"3 hours\"\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
