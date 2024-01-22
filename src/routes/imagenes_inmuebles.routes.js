import express from 'express';
import { getImagenesInmueble, uploadImage, getImagenPortadaByInmuebleId } from '../controllers/imagenes_inmuebles.controllers.js';
import { parser } from '../services/uploadImg.js'
import { authenticateJWT } from '../middleware/jwt.js';
const router = express.Router();

// Ruta para obtener todas las imágenes de un inmueble
router.get('/:id', getImagenesInmueble);

router.get('/portada/:id', getImagenPortadaByInmuebleId);

router.post('/upload',// authenticateJWT, 
  parser.single('image'), uploadImage);

export default router;

// Configura CORS para la ruta de upload
//router.options('/upload', cors());