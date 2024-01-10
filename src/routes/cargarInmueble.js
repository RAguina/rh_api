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
router.post('/cargarInmuebles', async (req,res) =>{
  
  const { nombre_propiedad, descripcion, tipo_propiedad, ubicacion_propiedad, precio_propiedad, estado_propiedad, propietario_id, url_imagen } = req.body;

  // Inserta el nuevo usuario en la base de datos
  const nuevoInmueble = await Inmueble.create({ 
    nombre_propiedad, descripcion, tipo_propiedad, ubicacion_propiedad, precio_propiedad, estado_propiedad, propietario_id, url_imagen
  });

  const propiedad_id = nuevoInmueble;
  
    // Para cada archivo subido, crea una nueva entrada en la tabla ImagenInmueble
    req.files.forEach(async (file) => {
      await ImagenInmueble.create({
        propiedad_id, url_imagen: file.path
      });
    });
 
    res.send('Inmueble creado con éxito.');
  
});


export default router;
