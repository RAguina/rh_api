import { hasPermission } from '../casbin.js';

export const checkPermission = async (req, res, next) => {
  const usuario = req.user;
  const permiso = req.route.path; // Obtiene el permiso de la ruta actual

  const hasPerm = await hasPermission(usuario.rol_id, permiso);

  if (hasPerm) {
    next();
  } else {
      res.status(403).send(`No tienes permiso para acceder a la ruta: ${permiso}`);
    }
};  
