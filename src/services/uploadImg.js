//import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: false,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'inmuebles_images',
    format: async (req, file) => 'png',
    public_id: (req, file) => {
      return Date.now()
     // return file.imagen_propiedad; // Ajusta según cómo hayas generado el nombre en el frontend
    },
  },
});

export const parser = multer({ storage: storage });
