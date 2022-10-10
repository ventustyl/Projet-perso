const { trusted } = require("mongoose");
const postModel = require("../models/post.model.js");
const PostModel = require("../models/post.model.js");
const UserModel = require("../models/user.model.js");
const ObjectID = require("mongoose").Types.ObjectId;
bodyParser = require("body-parser");

module.exports.readPost = (req, res) => {
  PostModel.find((err, data) => {
    if (!err) res.send(data);
    // rangé dans le sens inverse createdAt: -1
    else console.log("L'erreur : " + err);
  }).sort({ createdAt: -1 });
};
module.exports.createPost = async (req, res) => {
  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    console.log(req.body.posterId);
    console.log(err);
    return res.status(400).send(err);
  }
};
module.exports.updatePost = (req, res) => {
  // req.params est l'id passé apres l'URL
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnue : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };

  postModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, data) => {
      if (!err) res.send(data);
      else console.log("Update error : " + err);
    }
  );
};

module.exports.deletePost = (req, res) => {
  // req.params est l'id passé apres l'URL
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnue : " + req.params.id);

  postModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) res.send(data);
    else console.log("Delete error " + err);
  });
};

// Module post pour ajouter un like post
module.exports.likePost = async (req, res) => {
  // req.params est l'id passé apres l'URL
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Module post pour retirer un like post
module.exports.unlikePost = async (req, res) => {
  // req.params est l'id passé apres l'URL
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err, data) => {
        if (!err) res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Commentaire sur post
module.exports.commentPost = async (req, res) => {
  // req.params est l'id passé apres l'URL
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, data) => {
        if (!err) return res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Edit du commentaire
module.exports.editCommentPost = async (req, res) => {
  // req.params est l'id passé apres l'URL
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    PostModel.findById(req.params.id, (err, data) => {
      const theComment = data.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );
      if (!theComment) return res.status(404).send("Commentaire non trouvé");
      theComment.text = req.body.text;
      return data.save((err) => {
        if (!err) return res.status(200).send(data);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Supression du commentaire
module.exports.deleteCommentPost = async (req, res) => {
  // req.params est l'id passé apres l'URL
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, data) => {
        if (!err) return res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
