import { Router } from "express";
import { ContatosController } from "../controllers";
import { PessoasController } from "../controllers";
import { UsuariosController } from "../controllers";

const router = Router();

//Rotas de contatos
router.get('/contacts', ContatosController.getAllValidation, ContatosController.getAll);
router.get('/contacts/:id', ContatosController.getByIdValidation, ContatosController.getById);
router.post('/contacts', ContatosController.createValidation, ContatosController.create);
router.put('/contacts/:id', ContatosController.updateByIdValidation, ContatosController.updateById);
router.delete('/contacts/:id', ContatosController.deleteByIdValidation, ContatosController.deleteById);

//Rotas de pessoas
router.get('/peoples', PessoasController.getAllValidation, PessoasController.getAll);
router.get('/peoples/:id', PessoasController.getByIdValidation, PessoasController.getById);
router.post('/peoples', PessoasController.createValidation, PessoasController.create);
router.put('/peoples/:id', PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/peoples/:id', PessoasController.deleteByIdValidation, PessoasController.deleteById);

//Rotas de Usuarios
router.post('/signIn', UsuariosController.signInValidation, UsuariosController.signIn);
router.post('/signUp', UsuariosController.signUpValidation, UsuariosController.signUp);

export {router};



