import express from 'express';
import { getImagenesInmueble, uploadImage } from '../controllers/imagenes_inmuebles.controllers.js';
import { parser } from '../services/uploadImg.js'
import { authenticateJWT } from '../middleware/jwt.js';
const router = express.Router();


// Configura CORS para la ruta de upload
router.options('/upload', cors());

// Ruta para obtener todas las imágenes de un inmueble
router.get('/:id', getImagenesInmueble);

router.post('/upload', parser.single('image'), uploadImage);


export default router;
