// amenities.js
import express from 'express';
import {
  obtenerComodidadesPorPropiedadId,
  crearComodidades,
  actualizarComodidades,
} from '../controllers/amenities.controllers.js'; // Asegúrate de tener el nombre correcto del controlador
import { authenticateJWT } from '../middleware/jwt.js';

const router = express.Router();

// Ruta para obtener comodidades por propiedadId
router.get('/:propiedadId', //authenticateJWT, 
obtenerComodidadesPorPropiedadId);

// Ruta para crear comodidades para una propiedad
router.post('/:propiedadId', //authenticateJWT, 
crearComodidades);

// Ruta para actualizar comodidades por propiedadId
router.put('/:propiedadId', //authenticateJWT, 
actualizarComodidades);

export default router;
