import path from 'path';
import { fileURLToPath } from 'url';

// setting current folder path, because ES module does not have `__dirname` declared
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// upload folder config
export const UPLOAD_DIR_NAME = 'uploads';
export const UPLOAD_DIR_PATH = path.join(__dirname, '../' + UPLOAD_DIR_NAME);

// request config
export const IMAGE_FIELD = 'upload';
export const UPLOAD_PATH = '/upload';

// resize config
export const IMAGE_REDUCED_WIDTH = 1024;

// server config
export const PORT = 3333;
export const URL = `http://localhost:${PORT}`;
