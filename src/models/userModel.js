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
  es_propietario: DataTypes.BOOLEAN
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
});

Usuario.prototype.verifyPassword = async function (password) {
  return await argon2.verify(this.password, password);
};
export default Usuario;
/*
Usuario.prototype.hashPassword = async function (password) {
  const salt = crypto.randomBytes(16);
  const hashedPassword = await argon2id.hash(password, {
    salt: salt,
    timeCost: 4,
    memoryCost: 13,
    parallelism: 2,
    type: argon2id.argon2id
  });
  this.password = hashedPassword;
};

Usuario.addHook('beforeCreate', async (usuario) => {
  const hashedPassword = await usuario.hashPassword(usuario.password);
  usuario.password = hashedPassword;
});
*/
