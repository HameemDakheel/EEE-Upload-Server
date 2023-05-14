const mongoose = require("mongoose");
const User = mongoose.model("User");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const logger = require("../config/logger");
const util = require("util");

function Upload(req, res) {
  let username = req.decoded.payload.username;
  let pathname = req.query.path || "/";
  let upload_path = path.join(process.env.DEFAULT_PATH, username, pathname);
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

  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: upload_path,
    maxFileSize: 3 * 1024 * 1024 * 1024,
    keepExtension: true,
  });

  const files = [];
  const fields = [];

  form
    .on("fileBegin", (name, file) => {
      file.filepath = path.join(form.uploadDir, name);
    })
    .on("file", (fileName, file) => {
      files.push({ fileName, path: file.filepath });
      logger.info(`${username} is uploading ${fileName} to ${file.filepath}`);
    })
    .on("field", (field, value) => {
      fields.push({ field, value });
    })
    .on("end", () => {
      logger.info(`${username} is finish uploading`);
      message = `received files:\n\n${util.inspect(files)}`;
      res.status(200).send(message);
    })
    .on("error", (error) => {
      console.log(error);
      logger.error(error);
    });
  form.parse(req);
}

module.exports = {
  Upload,
};
