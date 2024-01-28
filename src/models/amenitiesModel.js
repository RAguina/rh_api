// amenitiesModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Inmueble from './inmuebleModel.js';

const Amenities = sequelize.define('amenities', {
  id_amenities: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  airConditioning: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  heating: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  garage: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  garden: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  grill: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  pool: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  tv: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  wifi: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  pets: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  youngGroup: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  ecoFriendly: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  checkIn: {
    type: DataTypes.TIME,
    allowNull: true
    // Ajusta según tus necesidades, si el checkIn puede ser nulo
  },
  checkOut: {
    type: DataTypes.TIME,
    allowNull: true
    // Ajusta según tus necesidades, si el checkOut puede ser nulo
  }
}, {
  timestamps: true,
  createdAt: 'createdat',
  updatedAt: 'updatedat'
});

Amenities.belongsTo(Inmueble, {
  foreignKey: 'propiedad_id',
  unique: true
});

Inmueble.hasOne(Amenities, {
  foreignKey: 'propiedad_id'
});

export default Amenities;
