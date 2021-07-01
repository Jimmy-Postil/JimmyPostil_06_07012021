//Enregistrement des fichiers images avec multer
const multer = require('multer');


//Modification de l'extension des fichiers
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    //On enregistre dans le dossier "images"
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    //On génère le nom du fichier avec son nom d'origine ainsi qu'un numéro unique à la date actuelle puis son extension
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');