import dotenv from 'dotenv';
import path from 'path';
import { cwd, env } from 'node:process';

dotenv.config({ path: path.join(cwd(),".env") });

const { PORT, DB_URI } = env;

export { PORT, DB_URI };