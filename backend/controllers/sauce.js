const Sauce = require('../models/sauce');
const fs = require('fs');

//Logique métiers pour les sauces
//(GET) Lecture de toutes les sauces présentent dans la base de données
exports.gettAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json({ sauces }))
        .catch(error => res.status(400).json({ error }));
}

//(GET) Lecture d'une seule sauce avce son id
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json({ sauce }))
        .catch(error => res.status(404).json({ error }));
}