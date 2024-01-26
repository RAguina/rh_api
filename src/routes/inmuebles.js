import express from 'express';
import { getInmuebles, getDetallePropiedad, updateInmueble, deleteInmueble, createInmueble, agregarCoordenadas } from '../controllers/inmuebles.controllers.js';
import { authenticateJWT } from '../middleware/jwt.js';

const router = express.Router();

// Ruta para obtener todos los inmuebles
router.get('/', getInmuebles);

// Ruta para obtener un inmueble
router.get('/:id', getDetallePropiedad);

// Ruta para actualizar los datos de primer step en un inmueble
router.put('/:id', updateInmueble);

// Ruta para agregar coordenadas a un inmueble
router.put('/agregarCoordenadas/:id', agregarCoordenadas);

// Ruta para crear un nuevo inmueble
router.post('/', createInmueble);

// Ruta para eliminar un inmueble
router.delete('/:id', deleteInmueble);

export default router;
