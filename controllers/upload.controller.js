const UserModel = require("../models/user.model");
const sharp = require('sharp')
const fs = require("fs");
const  promisify = require("util");
const util = require('util')
const stream = require('stream')
const pipeline = util.promisify(stream.pipeline)

const { uploadErrors } = require("../utils/errors.utils");
const { log } = require("console");

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.mimetype != "image/jpg" &&
      req.file.mimetype != "image/png" &&
      req.file.mimetype != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 500000)
      throw Error("max size");

  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }

  const fileName = req.body.name + ".jpg";

// fonctionne jusqu'ici
   await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  );

};
