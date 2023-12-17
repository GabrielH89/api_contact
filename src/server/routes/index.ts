import { Router } from "express";

import { ContatosController } from "../controllers";

const router = Router();

router.post("/contacts", ContatosController.createValidation, ContatosController.create);

export {router};