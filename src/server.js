  import express from 'express';
  import { allowCrossDomain } from './middleware/cors.js';
  import { checkPermission } from './utils/auth.js';
  import { fileURLToPath } from 'url';
  import path, { dirname, join } from 'path';
  import inmueblesRoutes from './routes/inmuebles.js';
  import imagenesInmueblesRoutes from './routes/imagenes_inmuebles.routes.js';
  import usuariosRoutes from './routes/propietarios.js';
  import amenitiesRoutes from './routes/amenities.js';
  import adminRoutes from './routes/admin.routes.js';
  import morgan from 'morgan';
  import { authenticateJWT } from './middleware/jwt.js';

  const app = express();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const publicDirectory = join(__dirname, 'public');

/* Middleware CORS*/
  app.use(allowCrossDomain);

/* DEV: Middleware MORGAN*/
  app.use(morgan('dev'));

/* Middleware express*/
  app.use(express.json());  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(publicDirectory));

/* Middleware Routes */
  app.use('/inmuebles', inmueblesRoutes);
  app.use('/imagen_inmuebles', imagenesInmueblesRoutes);
  app.use('/usuarios', usuariosRoutes);
  app.use('/amenities', amenitiesRoutes);

 
  app.use('/admin', authenticateJWT, checkPermission, adminRoutes);
 // app.use(authenticateJWT, checkPermission);
 // app.use('/admin', adminRoutes);



  const port = process.env.PORT || 8080;

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(publicDirectory, 'index.html'));
  });

  app.listen(port, () => {
    console.log(`Servidor corriendo en Puerto : ${port}`);
  });




  //app.use(cors(corsOptions))