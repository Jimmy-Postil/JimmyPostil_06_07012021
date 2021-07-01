const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//Logique métiers des utilisateurs
//Création des nouveaux utilisateurs avec signup
exports.signup = (req, res, next) => {
    //Hash du mot de passe à l'aide de bcrypt
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //Création d'un nouvel utilisateur et hashage du mot de passe
            const user = new User({
                userId: user._id,
                email: req.body.email,
                password: hash
            });
            //Sauvegarde de l'utilisateur dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//Connexion d'un utilisateur
exports.login = (req, res, next) => {
    //Recherche de l'utlisateur dans la base de données
    User.findOne({ email: req.body.email })
        .then(user => {
            //Si l'utilisateur n'est pas trouvé
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            //Comparaison du mot de passe de la requête avec celui de la base de données
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
                    //Si le mot de passe est le même on crée un token pour sécuriser le compte de l'utlisateur
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM TOKEN SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

}
