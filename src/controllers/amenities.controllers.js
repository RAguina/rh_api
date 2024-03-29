import Amenities from '../models/amenitiesModel.js';

// Controlador para obtener comodidades por propiedadId
export const obtenerComodidadesPorPropiedadId = async (req, res) => {
  const { propiedadId } = req.params;

  try {
    const comodidades = await Amenities.findOne({
      where: {
        propiedad_id: propiedadId
      }
    });
    res.json(comodidades);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener las comodidades');
  }
};

// Controlador para crear comodidades para una propiedad
export const crearComodidades = async (req, res) => {
  console.log('Llegó a crearComodidades');
  const { propiedadId } = req.params;
  const propiedadId2 = req.params.propiedad_id;
  console.log('propiedadId:', propiedadId);
  console.log('propiedadId2:', propiedadId2);
  const {
    airconditioning,
    heating,
    garage,
    garden,
    grill,
    pool,
    tv,
    wifi,
    pets,
    younggroup,
    ecofriendly,
    checkin,
    checkout
  } = req.body;

  try {
    const nuevasComodidades = await Amenities.create({
      propiedad_id: propiedadId,
      airconditioning,
      heating,
      garage,
      garden,
      grill,
      pool,
      tv,
      wifi,
      pets,
      younggroup,
      ecofriendly,
      checkin,
      checkout
    });
    res.json(nuevasComodidades);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear las comodidades');
  }
};

// Controlador para actualizar comodidades por propiedadId
export const actualizarComodidades = async (req, res) => {
  const { propiedadId } = req.params;
  const {
    airconditioning,
    heating,
    garage,
    garden,
    grill,
    pool,
    tv,
    wifi,
    pets,
    younggroup,
    ecofriendly,
    checkin,
    checkout
  } = req.body;

  try {
    const comodidades = await Amenities.findOne({
      where: {
        propiedad_id: propiedadId
      }
    });

    if (!comodidades) {
      return res.status(404).json({ error: 'No se encontraron comodidades para la propiedad con el ID proporcionado.' });
    }

    // Actualizar campos de comodidades
    comodidades.airconditioning = airconditioning;
    comodidades.heating = heating;
    comodidades.garage = garage;
    comodidades.garden = garden;
    comodidades.grill = grill;
    comodidades.pool = pool;
    comodidades.tv = tv;
    comodidades.wifi = wifi;
    comodidades.pets = pets;
    comodidades.younggroup = younggroup;
    comodidades.ecofriendly = ecofriendly;
    comodidades.checkin = checkin;
    comodidades.checkout = checkout;

    await comodidades.save();
    
    res.json(comodidades);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar las comodidades');
  }
};