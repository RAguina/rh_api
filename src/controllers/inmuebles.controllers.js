import Inmueble from '../models/inmuebleModel.js';
import ImagenInmueble from '../models/imagenesInmueblesModel.js';

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

export const createInmueble = async (req, res) => {
  try {
    //const errors = validationResult(req);
    /*if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }*/
    console.log("Hasta aca llega createInmueble paso1")
    console.log("Hasta aca llega createInmueble pASO 1 req.body:",req.body)
    const { nombre_propiedad, descripcion, tipo_propiedad, ubicacion_propiedad, precio_propiedad, estado_propiedad, propietario_id, url_imagen } = req.body;
    console.log("hasta aca llega(createInmueble paso2)");
    // Inserta el nuevo usuario en la base de datos
    const nuevoInmueble = await Inmueble.create({ 
      nombre_propiedad, descripcion, tipo_propiedad, ubicacion_propiedad, precio_propiedad, estado_propiedad, propietario_id, url_imagen
    });
    
    const propiedad_id = nuevoInmueble.id;
    await ImagenInmueble.create({
      propiedad_id, url_imagen
    })
    res.send('Inmueble e imagen creados.', url_imagen);
  } catch (err) {
    console.error(err);
    console.log("Error en createInmueble paso 3");
    //res.status(500).json({ message: err.message });
  } 
};
/*
// Controlador para crear un nuevo inmueble
export const createInmueble = async (req, res) => {
  const { nombre_propiedad, descripcion, tipo_propiedad, ubicacion_propiedad, precio_propiedad, estado_propiedad, propietario_id, url_imagen } = req.body;

    // Inicia una transacción
    const t = await sequelize.transaction();
  console.log("Cuerpo de la Solicitud 23sdfskfskdfk:", req.body)
  console.log("Cuerpo de la Solicitud que se te cante", req.body.propietario_id)
  try {
    const inmueble = await Inmueble.create(
      { nombre_propiedad, descripcion, tipo_propiedad, ubicacion_propiedad, precio_propiedad, estado_propiedad, propietario_id },
      { transaction: t }
    );
    
    await ImagenInmueble.create(
      { propiedad_id: inmueble.id_propiedad, url_imagen },
      { transaction: t }
    );

    // Confirma la transacción
    await t.commit();

    res.send('Inmueble creado.');
  } catch (err) {
      // Revierte la transacción en caso de error
      await t.rollback();
    console.error(err);
    res.status(500).send('Error al crear el inmueble');
  }
};
*/