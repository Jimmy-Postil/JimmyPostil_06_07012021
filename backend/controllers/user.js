const bcrypt = require('bcrypt');
const { json } = require('body-parser');
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
                email: req.body.email,
                password: hash
            });
            //Sauvegarde de l'utilisateur dans la base de données
            user.save()
                .then(() => res.status(200).json({ message: 'Utilisateur crée !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user_id,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM TOKEN SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

}
