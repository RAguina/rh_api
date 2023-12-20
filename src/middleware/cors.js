/*
// Verifica si es una solicitud OPTIONS para la ruta de upload
if (req.method === 'OPTIONS' && req.url === '/imagen_inmuebles/upload') {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).end();
  console.log('Middleware allowCrossDomain ejecutado 2');
  return;
}
//console.log('Middleware allowCrossDomain ejecutado');
// console.log('Método:', req.method, 'Ruta:', req.path); // Imprime el método y la ruta
*/
export const allowCrossDomain = (req, res, next) => {
  const allowedOrigins = ['https://rh-app.vercel.app', 'https://rhapi-dev-kkbb.3.us-1.fl0.io/inmuebles'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  console.log('Middleware allowCrossDomain ejecutado 2');
  next();
};

/*
export const allowCrossDomain = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
};
//res.setHeader('Access-Control-Allow-Origin', 'https://rh-app.vercel.app');
*/


/*
export const corsOptions = {
  //origin: '*',
  //origin: 'http://localhost:5173',
  //origin: 'https://raguina.github.io/rh_app/',
  origin: 'https://rh-app.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
*/