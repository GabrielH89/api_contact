import { Router } from "express";
import { ContatosController } from "../controllers";
import { PessoasController } from "../controllers";
import { UsuariosController } from "../controllers";
import { ensureAuthenticated } from "../shared/middlewares";

const router = Router();

//Rotas de contatos
router.get('/contacts', ensureAuthenticated, ContatosController.getAllValidation, ContatosController.getAll);
router.get('/contacts/:id', ensureAuthenticated, ContatosController.getByIdValidation, ContatosController.getById);
router.post('/contacts', ensureAuthenticated, ContatosController.createValidation, ContatosController.create);
router.put('/contacts/:id', ensureAuthenticated, ContatosController.updateByIdValidation, ContatosController.updateById);
router.delete('/contacts/:id', ensureAuthenticated, ContatosController.deleteByIdValidation, ContatosController.deleteById);

//Rotas de pessoas
router.get('/peoples', ensureAuthenticated, PessoasController.getAllValidation, PessoasController.getAll);
router.get('/peoples/:id', ensureAuthenticated, PessoasController.getByIdValidation, PessoasController.getById);
router.post('/peoples', ensureAuthenticated, PessoasController.createValidation, PessoasController.create);
router.put('/peoples/:id', ensureAuthenticated, PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/peoples/:id', ensureAuthenticated, PessoasController.deleteByIdValidation, PessoasController.deleteById);

//Rotas de Usuarios
router.post('/signin', UsuariosController.signInValidation, UsuariosController.signIn);
router.post('/signup', UsuariosController.signUpValidation, UsuariosController.signUp);

export {router};



