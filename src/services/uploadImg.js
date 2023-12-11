//import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
  cloud_name: 'dh8egdhnm',
  api_key: '489248499699949',
  api_secret: 'AyPbRO0gTEZUhxZQ8FBIck6v3Tc',
  secure: false,
});

//const image1 = '../imagen14.png'


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'inmuebles_images',
    format: async (req, file) => 'png', // O ajusta según cómo hayas generado el nombre
    public_id: (req, file) => {
      // Usa el nombre único que generaste en el frontend
      return file.imagen_propiedad; // Ajusta según cómo hayas generado el nombre en el frontend
    },
  },
});

export const parser = multer({ storage: storage });
