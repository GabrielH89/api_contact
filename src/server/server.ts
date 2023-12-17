import express from 'express';
import 'dotenv/config';

const server = express();

server.use(express.json());

export {server};
