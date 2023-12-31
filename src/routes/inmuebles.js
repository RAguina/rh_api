import express from 'express';
import { getInmuebles, getDetallePropiedad, updateInmueble, deleteInmueble, createInmueble } from '../controllers/inmuebles.controllers.js';
import { authenticateJWT } from '../middleware/jwt.js';

const router = express.Router();

// Ruta para obtener todos los inmuebles
router.get('/', getInmuebles);

// Ruta para obtener un inmueble
router.get('/:id', getDetallePropiedad);

// Ruta para actualizar un inmueble
router.put('/:id', updateInmueble);

// Ruta para eliminar un inmueble
router.delete('/:id', deleteInmueble);

// Ruta para crear un nuevo inmueble
router.post('/', createInmueble);

export default router;
