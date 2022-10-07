const mongoose = require('mongoose');
require ('dotenv').config({path: './config/.env'})

// Connection à la base de données avec mongoose
mongoose
    .connect('mongodb+srv://'+ process.env.LOG +'@cluster0.zj87sas.mongodb.net/projet-data',
    )
    .then(() => console.log('Connection réussi à MongoDB'))
    .catch((err) => console.log('Echec de la connection à MongoDB', err));