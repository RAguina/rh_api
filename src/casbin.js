import { SequelizeAdapter } from 'casbin-sequelize-adapter';
import { obtenerRolUsuario } from './controllers/propietarios.controllers.js';
import sequelize from './config/db.js'
import casbin from 'casbin'





export const hasPermission = async (usuario, permiso) => {
  const sequelizeAdapter = await SequelizeAdapter(sequelize);
  const casbinEnforcer = new casbin.newEnforcer('./config/model.conf', sequelizeAdapter);
  try {
    const rolUsuario = await obtenerRolUsuario(usuario);
    return casbinEnforcer.enforce(rolUsuario, permiso);
  } catch (error) {
    // Manejar el error
    console.error(error);
    throw new Error('Error al verificar el permiso');
  }
};




/*
import casbin from 'casbin'

const casbinEnforcer = new casbin.Enforcer('model.conf', 'policy.csv');

casbinEnforcer.addRole('inquilino');
casbinEnforcer.addRole('propietario');
casbinEnforcer.addRole('propietarioPremium');
casbinEnforcer.addRole('administrador');

casbinEnforcer.addPermission('inquilino', 'propiedades', 'ver');
casbinEnforcer.addPermission('inquilino', 'propiedades', 'alquilar');
casbinEnforcer.addPermission('propietario', 'propiedades', 'crear');
casbinEnforcer.addPermission('propietario', 'propiedades', 'editar');
casbin.addPermission('propietario', 'propiedades', 'ver');
casbinEnforcer.addPermission('propietarioPremium', 'propiedades', 'crear');
casbinEnforcer.addPermission('propietarioPremium', 'propiedades', 'editar');
casbinEnforcer.addPermission('propietarioPremium', 'propiedades', 'ver');
casbinEnforcer.addPermission('propietarioPremium', 'inquilinos', 'gestionar');
casbinEnforcer.addPermission('administrador', '*');

export const hasPermission = async (usuario, permiso) => {
  const rolUsuario = await obtenerRolUsuario(usuario);
  return casbinEnforcer.enforce(rolUsuario, permiso);
};
*/