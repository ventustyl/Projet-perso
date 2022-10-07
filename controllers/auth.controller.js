// Inscription Connection Deconnection
const UserModel = require ('../models/user.model.js');

module.exports.signUp = async (req, res) => {
    console.log(req.body)
    const {pseudo, email, password} = req.body

    try {
const user = await UserModel.create({pseudo, email, password})

res.status(201).json({user: user._id})
    }
    catch(err) 
    {
res.status(200).send(err)
    }
}