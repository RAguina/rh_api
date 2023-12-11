import express from 'express';
import { getUsers, getUserDetail, updateUser, deleteUser, createUser, loginUser } from '../controllers/propietarios.controllers.js';

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', getUsers);

// Ruta para obtener un usuario específico
router.get('/:id', getUserDetail);

// Ruta para actualizar un usuario
router.put('/:id', updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', deleteUser);

// Ruta para crear un nuevo usuario
router.post('/', createUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

export default router;
