import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router } from './routes';
import './shared/services/TranslationsYup';
const server = express();

server.use(cors({
    origin: process.env.ENABLED_CORS?.split(';') || []
}));
server.use(express.json());
server.use(router);
// Adicione outros middlewares aqui, se necessário

export { server };
