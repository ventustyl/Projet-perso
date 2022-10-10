const postModel = require('../models/post.model.js');
const UserModel = require('../models/user.model.js');
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
    PostModel.find((err, data) => {
        if (!err) res.send(data);
        else console.log("L'erreur : " + err);
    })

}
module.exports.createPost = async (req, res) => {
    const newPost = new postModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],
    })
    try {
        const post = await newPost.save()
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err)
    }
}
module.exports.updatePost = (req, res) => {

}
module.exports.deletePost = (req, res) => {

}
