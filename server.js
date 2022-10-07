// Appel de express JS
const express = require ('express');

//Appel de la base de donnée
require('./config/db')


// Appel de routes
const userRoutes = require('./routes/user.routes.js');

//Appel de body-parser
const bodyParser = require('body-parser');

// -------------------------------------
// MongoDB
// Pseudo : Noxy
// Mot de passe : fcilteam
// Mongo Atlas
// mongodb+srv://Noxy:fcilteam@cluster0.zj87sas.mongodb.net/test
// -------------------------------------



// Chemin pour la variable d'environnement
require ('dotenv').config({path: './config/.env'})
const app = express();



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use ('/api/user', userRoutes)



// Server Ecoute sur le port 5000
app.listen (process.env.PORT, ()=>{
    console.log(`Ecoute sur le port ${process.env.PORT}` );
})
