import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Usuario from './userModel.js';

const Inmueble = sequelize.define('inmueble', {
  id_propiedad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_propiedad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion:  {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tipo_propiedad: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  ubicacion_propiedad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio_propiedad: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estado_propiedad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  propietario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imagen_propiedad: DataTypes.STRING,
  allowNull: true
}, {
  timestamps: true,
  createdAt: 'createdat',
  updatedAt: 'updatedat'
});

Inmueble.belongsTo(Usuario, {
  foreignKey: 'propietario_id'
});

Usuario.hasMany(Inmueble, {
  foreignKey: 'propietario_id'
});

export default Inmueble;
