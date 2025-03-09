/** @type {import("drizzle-kit").Config} */
export default {
  dialect: "postgresql",
  schema: './configs/schema.jsx', // Ensure this path is correct
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL,
  },
};