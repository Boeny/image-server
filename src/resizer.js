import { statSync, renameSync } from 'fs';
import sharp from 'sharp';

const TEMP_PATH = './tmp.tmp';

export async function resize(path, width, quality=80) {
  await sharp(path)
    .resize({ width })
    .jpeg({ quality })
    .toFile(TEMP_PATH); // save to temporary file

  renameSync(TEMP_PATH, path); // rewrite original file
}

export function getFileSizeMB(path) {
  const {size} = statSync(path);
  return size / (1024 * 1024);
}
