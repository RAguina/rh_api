import ImagenInmueble from '../models/imagenesInmueblesModel.js';
import { parser } from '../services/uploadImg.js'
import {v2 as cloudinary} from 'cloudinary'


// Controlador para obtener todas las imágenes de un inmueble
export const getImagenesInmueble = async (req, res) => {
  const { id } = req.params;

  try {
    const imagenes = await ImagenInmueble.findAll({
      where: {
        propiedad_id: id
      }
    });
    res.send(imagenes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener las imágenes');
  }
};

export const uploadImage = async (req, res) => {

  // Si el cuerpo de la solicitud no contiene la imagen sino sube la imagen a Cloudinary
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ninguna imagen.' });
  } 
  else {
    const image = req.file;

    // Sube la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(image.path);
    console.log("La ruta de imagen es:",image.path);
    // Devuelve la URL de la imagen en Cloudinary
    return res.json({ success: true, imageUrl: result.url });
  } 
}

/*
//(Version semi estable)Funcion que se encarga de registrar imagen en la base de datos
export const uploadImage = async (req, res) => {
  console.log("hola1");  // Asegúrate de que la imagen se está enviando en la solicitud
  console.log("cuerpo del req:",req.body);
  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: 'No se subió ninguna imagen.' });
  }

  // La imagen subida estará disponible en req.files.image
  const image = req.files.image;

  try {
    // Sube la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(image.path);
    result.then(()=>{

      console.log('secure_url:', result.secure_url);
      console.log('public_id:', result.public_id);
      console.log("Hola soy un breackpoint 1")
    })


    // Crea un nuevo registro en la base de datos para la imagen
    const nuevaImagen = await ImagenInmueble.create({
      propiedad_id: req.body.propiedad_id, // Ajusta según tu modelo
      url: result.secure_url,
      public_id: result.public_id,
    });
    console.log("nueva imagen:", nuevaImagen);

    // Usa la constante file en tu lógica, por ejemplo:
    console.log("Información de la imagen procesada:", image);

    // Devuelve el resultado de la subida
    res.json(result);
  } catch (error) {
    console.error("Error durante el proceso:", error);

    // Maneja cualquier error que ocurra durante el proceso
    if (error instanceof multer.MulterError) {
      // Error de multer al procesar la imagen
      res.status(400).json({ error: 'Error al procesar la imagen.' });
    } else if (error.message === 'Formato de imagen no válido.') {
      // Puedes personalizar este mensaje según tus necesidades
      res.status(400).json({ error: 'Formato de imagen no válido.' });
    } else {
      // Otros errores
      res.status(500).json({ error: 'Hubo un error durante el proceso.' });
    }
  }
};
*/
