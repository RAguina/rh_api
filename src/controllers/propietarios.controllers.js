import { validationResult } from 'express-validator';
import Usuario from '../models/userModel.js';
import { emailExiste } from '../utils/userUtils.js';
import jwt from 'jsonwebtoken';

// Controlador para obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['password'] },
    });
    res.send(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los usuarios');
  }
};

// Controlador para obtener un usuario específico
export const getUserDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      res.send(usuario);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el usuario');
  }
};

// Controlador para actualizar un usuario
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, ciudad, email, password, es_propietario } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      await usuario.update({ nombre, apellido, ciudad, email, password, es_propietario });
      res.send(`Usuario con id ${id} actualizado.`);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar el usuario');
  }
};

// Controlador para eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      await usuario.destroy();
      res.send(`Usuario con id ${id} eliminado.`);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar el usuario');
  }
};

// Controlador para crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, apellido, ciudad, email, password, es_propietario } = req.body;
  
    // Verifica si el email ya existe
    if (await emailExiste(email)) {
      throw new Error('Usuario ya registrado');
    }
    
    // Inserta el nuevo usuario en la base de datos
    await Usuario.create({ nombre, apellido, ciudad, email, password, es_propietario });
    res.send('Usuario creado.');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  } 
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Datos recibidos:', email, password);

    // Verifica si el correo electrónico existe
    const emailExists = await emailExiste(email);
    console.log('El correo electrónico existe:', emailExists);
    if (!emailExists) { 
      return res.status(400).json({ message: 'Correo electrónico incorrecto' });
    }

    // Si el correo electrónico existe, busca al usuario en la base de datos
    const user = await Usuario.findOne({ where: { email: email } });
    console.log('Usuario encontrado:', user);

    // Verifica la contraseña
    const passwordIsValid = await user.verifyPassword(password);
    console.log('La contraseña es válida:', passwordIsValid);
    if (!passwordIsValid) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Aquí es donde normalmente crearías un token de sesión y lo enviarías al cliente
    const token = jwt.sign({ email: user.email, idPropietario: user.idPropietario }, process.env.JWT_SECRET, { expiresIn: '1h' });

    //Enviar la hora de creacion del token para finalizar la sesion
    const now = new Date();
    const expiry = now.getTime() + 3600000; 
    res.json({ token, expiry, message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error del servidor:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};


/*
// Controlador para iniciar sesión
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica si el correo electrónico existe
    if (!await emailExiste(email)) {
      return res.status(400).json({ message: 'Correo electrónico incorrecto' });
    }

    // Si el correo electrónico existe, busca al usuario en la base de datos
    const user = await Usuario.findOne({ where: { email: email } });

    // Verifica la contraseña
    const passwordIsValid = await argon2.verify(user.password, password);

    if (!passwordIsValid) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Si todo está bien, inicia la sesión del usuario
    // Aquí es donde normalmente crearías un token de sesión y lo enviarías al cliente

    res.json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
*/