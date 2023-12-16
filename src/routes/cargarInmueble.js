import express from 'express';
import { getInmuebles, getDetallePropiedad, updateInmueble, deleteInmueble} from '../controllers/inmuebles.controllers.js';
import { authenticateJWT } from '../middleware/jwt.js';
import Inmueble from '../models/inmuebleModel.js';
import ImagenInmueble from '../models/imagenesInmueblesModel.js';

const router = express.Router();

// Ruta para obtener todos los inmuebles
router.get('/', getInmuebles);

// Ruta para obtener un inmueble
router.get('/:id', getDetallePropiedad);

// Ruta para actualizar un inmueble
router.put('/:id', updateInmueble);

// Ruta para eliminar un inmueble
router.delete('/:id', deleteInmueble);

// Ruta para obtener todos los inmuebles
router.post('/', async (req,res) =>{
  
  const { nombre_propiedad, descripcion, tipo_propiedad, ubicacion_propiedad, precio_propiedad, estado_propiedad, propietario_id, url_imagen } = req.body;

  // Inserta el nuevo usuario en la base de datos
  const nuevoInmueble = await Inmueble.create({ 
    nombre_propiedad, descripcion, tipo_propiedad, ubicacion_propiedad, precio_propiedad, estado_propiedad, propietario_id, url_imagen
  });

  const propiedad_id = nuevoInmueble;
  await ImagenInmueble.create({
    propiedad_id, url_imagen
  })
  console.log("ImagenInmueble.propiedad_id",ImagenInmueble.propiedad_id);
  console.log("ImagenInmueble.url_imagen",ImagenInmueble.url_imagen);
  
});


export default router;
