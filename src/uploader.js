import fs from 'fs';
import path from 'path';
import multer from 'multer';

export function getUploader(uploadDir, imageField) {
  const multerUpload = multer({ storage: getStorage(uploadDir) });
  const uploadHandler = multerUpload.single(imageField);

  return upload(uploadHandler);
}

function getStorage(uploadDir) {
  return multer.diskStorage({
    destination: (req, file, callback) => {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname);

      callback(null, `${getFileName()}${ext}`);
    },
  });
}

function getFileName() {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}_${date.getSeconds()}.${date.getMilliseconds()}`;
}

const upload = (uploadHandler) => (req, res, onSuccess, onFail) => {
  try {
    uploadHandler(req, res, async (e) => {
      if (e) {
        onFail(e);
      } else {
        onSuccess();
      }
    });
  } catch (e) {
    onFail(e);
  }
}
