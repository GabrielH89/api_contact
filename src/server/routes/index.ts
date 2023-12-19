import { Router } from "express";

import { ContatosController } from "../controllers";

const router = Router();

//Rotas de contatos
router.get('/contacts', ContatosController.getAllValidation, ContatosController.getAll);
router.get('/contacts/:id', ContatosController.getByIdValidation, ContatosController.getById);
router.post('/contacts', ContatosController.createValidation, ContatosController.create);
router.put('/contacts/:id', ContatosController.updateByIdValidation, ContatosController.updateById);
router.delete('/contacts/:id', ContatosController.deleteByIdValidation, ContatosController.deleteById);

export {router};