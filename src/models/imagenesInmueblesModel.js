import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Inmueble from './inmuebleModel.js';

const ImagenInmueble = sequelize.define('imagen_inmueble', {
  id_imagen: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  url_imagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
  propiedad_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  is_cover: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
},{
  timestamps: true,
  createdAt: 'createdat',
  updatedAt: 'updatedat'
});

ImagenInmueble.belongsTo(Inmueble, {
  foreignKey: 'propiedad_id'
});

Inmueble.hasMany(ImagenInmueble, {
  foreignKey: 'propiedad_id'
});

export default ImagenInmueble;
