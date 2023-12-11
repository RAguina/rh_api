import express from 'express';
import cors from 'cors'
import { allowCrossDomain, corsOptions } from './middleware/cors.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import inmueblesRoutes from './routes/inmuebles.js';
import imagenesInmueblesRoutes from './routes/imagenes_inmuebles.routes.js';
import usuariosRoutes from './routes/propietarios.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(morgan('dev'));
//app.use(allowCrossDomain);
app.use(cors(corsOptions))
app.use(express.json());  

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDirectory = join(__dirname, 'public');

app.use(express.static(publicDirectory));
app.use('/inmuebles', inmueblesRoutes);
app.use('/imagen_inmuebles', imagenesInmueblesRoutes);
app.use('/usuarios', usuariosRoutes);

const port = process.env.PORT_API || 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en Puerto : ${port}`);
});