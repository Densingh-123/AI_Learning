import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

// Temporarily set the DRIZZLE_DATABASE_URL environment variable
process.env.DRIZZLE_DATABASE_URL = 'postgresql://Ai-Course-Generator_owner:npg_TF3ClWBe0NpY@ep-blue-field-a8klkky0-pooler.eastus2.azure.neon.tech/Ai-Course-Generator?sslmode=require';

if (!process.env.DRIZZLE_DATABASE_URL) {
  throw new Error('DRIZZLE_DATABASE_URL environment variable is not set');
}

console.log('Database URL:', process.env.DRIZZLE_DATABASE_URL);

const sql = neon(process.env.DRIZZLE_DATABASE_URL);
export const db = drizzle(sql);