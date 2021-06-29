const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Création du model user pour stocker l'utilisateur dans la base de données
const userSchema = mongoose.Schema({
    userId: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

//Evite que plusieurs utilisateurs s'inscrivent avec le même mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);