import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import crypto from "crypto";
import argon2 from 'argon2';

const Usuario = sequelize.define('usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol_id:{
    type: DataTypes.INTEGER,
    defaultValue: 1,
    references: {
      model: 'roles',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  createdAt: 'createdat',
  updatedAt: 'updatedat'
});

Usuario.prototype.hashPassword = async function (password) {
  const salt = crypto.randomBytes(16);
  const hashedPassword = await argon2.hash(password, {
    salt: salt,
      timeCost: 4,
      memoryCost: 4096,
      parallelism: 2,
    type: argon2.argon2id
  });
  return hashedPassword;
};

Usuario.addHook('beforeCreate', async (usuario) => {
  usuario.password = await usuario.hashPassword(usuario.password);
  const errors = [];

  if (!usuario.nombre) {
    errors.push('El nombre del usuario es obligatorio');
  }

  if (!usuario.email || !/^[\w-\.]+@[\w-\.]+\.[a-z]{2,}$/.test(usuario.email)) {
    errors.push('Debes ingresar un email válido');
  }

  if (!usuario.ciudad) {
    errors.push('La ciudad del usuario es obligatoria');
  }

  if (errors.length > 0) {
    throw new Error('Error al crear el usuario: ' + errors.join(', '));
  }
  
  if (!usuario.rol_id) {
    usuario.rol_id = 1;
  }
});

Usuario.prototype.verifyPassword = async function (password) {
  return await argon2.verify(this.password, password);
};

Usuario.cambiarRol = async function(idUsuario, nuevoRol) {
  const usuario = await this.findByPk(idUsuario);
  if (!usuario) throw new Error('Usuario no encontrado');

  usuario.rol_id = nuevoRol;
  await usuario.save();

  return usuario;
};

export default Usuario;

/*
// Configura el adaptador Sequelize para Casbin
const adapter = new SequelizeAdapter(sequelize);
const casbinEnforcer = new Casbin.Enforcer('model.conf', adapter);

// Carga las políticas desde la base de datos (si es necesario)
await adapter.loadPolicies();
*/
