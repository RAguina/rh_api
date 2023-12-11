import Usuario from '../models/userModel.js';

export const emailExiste = async (email) => {
  const usuario = await Usuario.findOne({ where: { email } });
  return usuario !== null;
};

export const insertarUsuario = async (usuario) => {
  const { nombre, apellido, ciudad, email, password, es_propietario } = usuario;
  await Usuario.create({ nombre, apellido, ciudad, email, password, es_propietario });
};
