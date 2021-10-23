const mongoose = require("mongoose");
const User = mongoose.model("User");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const logger = require('../config/logger');

function Upload(req, res) {
  let username = req.decoded.payload.username;
  let pathname = req.query.path|| "/";
  let upload_path = path.join(process.env.DEFAULT_PATH,username,pathname);
  let message;
  try {
    if (!fs.existsSync(upload_path)) {
      fs.mkdirSync(upload_path, {
        recursive: true,
      });
    }
  } catch (error) {
    logger.error(error);
  }

  const form = new formidable({
    multiples: true,
    uploadDir: upload_path,
    maxFileSize: 2 * 1024 * 1024 * 1024,
    keepExtension: true,
  });

  form
    .on("fileBegin", (name, file) => {
      file.path = path.join(upload_path, file.name);
    })
    .on("file",(fileName, file) => {
      logger.info(`${username} is uploading ${fileName} to ${file.path}`);
    })
    .on("end", () => {
      logger.info(`${username} is finish uploading`)
      message = "Upload Complete";
    })
	.on("error", (error) => {
		logger.error(error);
	})
  form.parse(req);
  res.status(200).send(message);
}



module.exports = {
  Upload,
};
