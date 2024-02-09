/*
import express from 'express';
const router = express.Router();

router.get('/adminPanel', async (req, res) => {
  const usuario = req.user;

  res.json({
    mensaje: `Bienvenido al panel de administración, ${usuario.nombre}!`,
    rol: usuario.rol,
    permisos: await casbinEnforcer.getPermissionsForUser(usuario.rol_id),
  });
});

export default router;
*/