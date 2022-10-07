
// Appel du schema
const UserModel = require ('../models/user.model.js');

// c
const ObjetID = require('mongoose').Types.ObjectId;


// renvoi tous les utilisateurs 
module.exports.getAllusers = async (req,res) => {
    //on retire le parametre password de la requete GET
    const users = await UserModel.find().select('-password');
    //status 200 tout va bien
    res.status(200).json(users);
}

// info de un utilisateur
module.exports.userInfo = (req,res)=>{
 // req.params est l'id passé apres l'URL
    if (!ObjetID.isValid(req.params.id))
    return res.status(400).send('ID inconnue: ' + req.params.id)

    UserModel.findById(req.params.id,(err, data) => {
        if(!err)res.send(data);
        else console.log ('ID inconnue: '+ err)
        // Toujours retirer le mot de passe 
    }).select('-password');
}

module.exports.updateUser = async (req, res) => {
 // req.params est l'id passé apres l'URL est connu
 if (!ObjetID.isValid(req.params.id))
 return res.status(400).send('ID inconnue: ' + req.params.id)
try {
    // trouve l'id et le met à jour
await UserModel.findOneAndUpdate(
    {_id: req.params.id},
    {
        //Met en place avec le $set
        $set: {
            bio: req.body.bio
        },
    }
)
}catch {

}
}