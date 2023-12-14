import express from 'express';
import { getImagenesInmueble, uploadImage } from '../controllers/imagenes_inmuebles.controllers.js';
import { parser } from '../services/uploadImg.js'
const router = express.Router();

// Ruta para obtener todas las imágenes de un inmueble
router.get('/:id', getImagenesInmueble);

router.post('/upload', parser.single('image'), uploadImage);


export default router;
