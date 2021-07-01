const Sauce = require('../models/sauce');
const fs = require('fs');

//Logique métiers pour les sauces

//(GET) Lecture de toutes les sauces présentent dans la base de données
exports.gettAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json({ sauces }))
        .catch(error => res.status(400).json({ error }));
}

//(GET) Lecture d'une seule sauce avec son id
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json({ sauce }))
        .catch(error => res.status(404).json({ error }));
}

//(POST) Création d'une nouvelle sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;

    //Nouvel objet sauce
    const sauce = new Sauce({
        ...sauceObject,
        //Création de l'url de l'image
        imageUrl: `${req.protocol}://${reg.get('host')}/images/${req.file.filename}`
    });
    //Enregistrement de l'objet sauce dans la base de données
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

//(UPDATE) Modification d'une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        //S'il existe déjà une image
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${reg.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    //S'il n'existe pas d'image
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

//(DELETE) Supression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            //On récupère le nom du fichier à supprimer
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.findOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé ! ' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
};