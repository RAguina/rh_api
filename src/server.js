  import express from 'express';
  import { allowCrossDomain } from './middleware/cors.js';
  import { fileURLToPath } from 'url';
  import path, { dirname, join } from 'path';
  import inmueblesRoutes from './routes/inmuebles.js';
  import imagenesInmueblesRoutes from './routes/imagenes_inmuebles.routes.js';
  import usuariosRoutes from './routes/propietarios.js';
  import morgan from 'morgan';

  const app = express();

  app.use(allowCrossDomain);
  app.use(morgan('dev'));

  app.use(express.json());  
  app.use(express.urlencoded({ extended: true }));

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const publicDirectory = join(__dirname, 'public');

  app.use(express.static(publicDirectory));
  app.use('/inmuebles', inmueblesRoutes);
  app.use('/imagen_inmuebles', imagenesInmueblesRoutes);
  app.use('/usuarios', usuariosRoutes);

  const port = process.env.PORT || 8080;

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(publicDirectory, 'index.html'));
  });

  app.listen(port, () => {
    console.log(`Servidor corriendo en Puerto : ${port}`);
  });




  //app.use(cors(corsOptions))