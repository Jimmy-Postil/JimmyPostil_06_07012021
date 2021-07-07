//Vérification que à l'authentification le token est valable avec jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //On récupèe le token dans la requête headers et on le décode
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        //On vérifie que le userId de la requête correspond à celui du token
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};