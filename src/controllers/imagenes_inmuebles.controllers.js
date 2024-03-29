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

      // Crea un nuevo registro en la tabla imagen_inmuebles
      const newImagenInmueble = await ImagenInmueble.create({
        url_imagen: image.path,
        propiedad_id: req.body.propietario_id, // Usa el idPropietario del cuerpo de la solicitud
        is_cover: req.body.is_cover, // Usa el valor is_cover del cuerpo de la solicitud
      });
      // Devuelve la URL de la imagen en Cloudinary
      return res.json({ success: true, imageDetails: newImagenInmueble });
    } 
  }

  export const getImagenPortadaByInmuebleId = async (req, res) => {
    const { id } = req.params;

    try {
      const imagenPortada = await ImagenInmueble.findOne({
        where: {
          propiedad_id: id,
          is_cover: true,
        },
      });

      if (!imagenPortada) {
        return res.status(404).json({ error: 'No se encontró una imagen de portada para el inmueble con ID proporcionado.' });
      }
      res.json(imagenPortada.url_imagen);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener la imagen de portada');
    }
  };

  // Supongamos que 'ImagenesInmuebles' es tu modelo Sequelize
  async function establecerComoPortada(idImagen) {
    // Iniciar una transacción
    const t = await sequelize.transaction();

    try {
      // Obtener la imagen
      const imagen = await ImagenesInmuebles.findByPk(idImagen, { transaction: t });

      // Obtener todas las imágenes de la misma propiedad
      const imagenesPropiedad = await ImagenesInmuebles.findAll({
        where: { propiedad_id: imagen.propiedad_id },
        transaction: t
      });

      // Establecer 'is_cover' en 'false' para todas las imágenes de la propiedad
      for (let img of imagenesPropiedad) {
        img.is_cover = false;
        await img.save({ transaction: t });
      }

      // Establecer 'is_cover' en 'true' para la imagen seleccionada
      imagen.is_cover = true;
      await imagen.save({ transaction: t });

      // Confirmar la transacción
      await t.commit();
    } catch (error) {
      // Si algo sale mal, revertir la transacción
      await t.rollback();
      throw error;
    }
  }

