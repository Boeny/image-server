import cors from 'cors';
import express from 'express';

// init express
const app = express();

// turn on CORS for all requests
export function useCORS() {
  app.use(cors());
}

// handling statis files (otherwise they will be prohibited)
export function useStatic(dirName, dirPath) {
  app.use('/' + dirName, express.static(dirPath));
}

export function post(path, callback) {
  app.post(path, callback)
}

export function startServer(port, callback) {
  app.listen(port, callback);
}
