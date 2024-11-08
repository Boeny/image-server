import path from 'path';
import { fileURLToPath } from 'url';

// setting current folder path, because ES module does not have `__dirname` declared
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// upload folder config
export const UPLOAD_DIR_NAME = process.env.UPLOAD_DIR_NAME;
export const UPLOAD_DIR_PATH = path.join(__dirname, '../' + UPLOAD_DIR_NAME);

// request config
export const IMAGE_FIELD = process.env.IMAGE_FIELD;
export const UPLOAD_URL = process.env.UPLOAD_URL;

// resize config
export const IMAGE_REDUCED_WIDTH = Number(process.env.IMAGE_REDUCED_WIDTH);

// server config
export const PORT = process.env.PORT;
export const URL = `http://localhost:${PORT}`;
