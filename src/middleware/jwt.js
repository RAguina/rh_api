import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log("Token recibido:", token); // Imprime el token recibido

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.log("Error al verificar el token:", err); // Imprime el error
                return res.sendStatus(403);
            }

            console.log("Datos del usuario en el token:", user); // Imprime los datos del usuario en el token
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
