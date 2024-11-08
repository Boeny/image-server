import { getUploader } from './uploader.js';
import { getFileSizeMB, resize } from './resizer.js';
import { post, startServer, useCORS, useStatic } from './server.js';
import { IMAGE_FIELD, PORT, UPLOAD_DIR_NAME, UPLOAD_URL, UPLOAD_DIR_PATH, URL, IMAGE_REDUCED_WIDTH } from './config.js';

useCORS();
useStatic(UPLOAD_DIR_NAME, UPLOAD_DIR_PATH);

const uploader = getUploader(UPLOAD_DIR_PATH, IMAGE_FIELD);

post(UPLOAD_URL, (req, res, next) => {
  uploader(req, res, async () => {
    const {originalname, path, filename} = req.file;
    console.log(`File uploaded succesfully:`, originalname, '->', path);

    console.log('Original file size is', getFileSizeMB(path));
    await resize(path, IMAGE_REDUCED_WIDTH);
    console.log('Final file size is', getFileSizeMB(path));

    res.status(200).json({
      message: 'File uploaded succesfully',
      file: req.file,
      url: `${URL}/${UPLOAD_DIR_NAME}/${filename}`,
    });
  }, (e) => {
    console.log('Error:', e.message);
    res.status(500).json({ error: { message: e.message } });
    // next() is mandatory, otherwise request will be pending forever
    next(e);
  })
})

startServer(PORT, () => console.log(`Server is running at ${URL}`));
