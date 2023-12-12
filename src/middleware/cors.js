export const allowCrossDomain = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://rh-mpg3r62oq-rodrigos-projects-d06be1de.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};

export const corsOptions = {
  //origin: '*',
  //origin: 'http://localhost:5173',
  //origin: 'https://raguina.github.io/rh_app/',
  origin: 'https://rh-pkqm6z5q6-rodrigos-projects-d06be1de.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};