// Appel de express JS
const express = require('express');

//Appel de la base de donnée
require('./config/db')

const { checkUser, requireAuth } = require('./middleware/auth.middleware.js')


// Appel de routes
const userRoutes = require('./routes/user.routes.js');
const postRoutes = require('./routes/post.routes.js');

//Appel de body-parser
const bodyParser = require('body-parser');
//Appel de cookie-parser
const cookieParser = require('cookie-parser');

// Appel de cors pour les requetes
const cors = require ('cors')



// ------------------------------------------------------------------//
// MongoDB                                                           //
// Pseudo : Noxy                                                     //
// Mot de passe : fcilteam                                           //
// Mongo Atlas                                                       //
// mongodb+srv://Noxy:fcilteam@cluster0.zj87sas.mongodb.net/test     //
// ------------------------------------------------------------------//


// Chemin pour la variable d'environnement
require('dotenv').config({ path: './config/.env' })
const app = express();


const corsOption = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOption))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


//jwt il se déclenche sur tous les GET
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})


// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes)


// Server Ecoute sur le port 5000
app.listen(process.env.PORT, () => {
    console.log(`Ecoute sur le port ${process.env.PORT}`);
})
