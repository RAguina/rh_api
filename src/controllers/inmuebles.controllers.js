import Inmueble from '../models/inmuebleModel.js';
import ImagenInmueble from '../models/imagenesInmueblesModel.js';
import Usuario from '../models/userModel.js';


// Controlador para obtener todos los inmuebles
export const getInmuebles = async (req, res) => {
  try {
    const inmuebles = await Inmueble.findAll();
    res.send(inmuebles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los inmuebles');
  }
};

// Controlador para obtener un inmueble específico
export const getDetallePropiedad = async (req, res) => {
  const { id } = req.params;

  try {
    const inmueble = await Inmueble.findByPk(id);
    if (inmueble) {
      res.send(inmueble);
    } else {
      res.status(404).send('Inmueble no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el inmueble');
  }
};



// Controlador para actualizar un inmueble
export const updateInmueble = async (req, res) => {
  const { id } = req.params;
  const { nombre_propiedad, descripcion, tipo_propiedad, ubicacion_propiedad, precio_propiedad, estado_propiedad, propietario_id, imagen_propiedad } = req.body;

  try {
    const inmueble = await Inmueble.findByPk(id);
    if (inmueble) {
      await inmueble.update({ nombre_propiedad, descripcion, tipo_propiedad, ubicacion_propiedad, precio_propiedad, estado_propiedad, propietario_id, imagen_propiedad });
      res.send(`Inmueble con id ${id} actualizado.`);
    } else {
      res.status(404).send('Inmueble no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar el inmueble');
  }
};

// Controlador para eliminar un inmueble
export const deleteInmueble = async (req, res) => {
  const { id } = req.params;

  try {
    const inmueble = await Inmueble.findByPk(id);
    if (inmueble) {
      await inmueble.destroy();
      res.send(`Inmueble con id ${id} eliminado.`);
    } else {
      res.status(404).send('Inmueble no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar el inmueble');
  }
};


// Controlador para crear un nuevo inmueble
export const createInmueble = async (req, res) => {
  const { nombre_propiedad, descripcion, tipo_propiedad, ubicacion_propiedad, precio_propiedad, estado_propiedad, propietario_id, url_imagen } = req.body;

  try {
    const inmueble = await Inmueble.create({ nombre_propiedad, descripcion, tipo_propiedad, ubicacion_propiedad, precio_propiedad, estado_propiedad, propietario_id });
    
    await ImagenInmueble.create({ propiedad_id: inmueble.id_propiedad, url_imagen });

    res.send('Inmueble creado.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear el inmueble');
  }
};
