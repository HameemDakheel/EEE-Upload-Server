const mongoose = require("mongoose");
const User = mongoose.model("User");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

function Upload(req, res) {
  let username = req.decoded.payload.username;
  let pathname = req.query.path|| "/"
  console.log(req.decoded, pathname);
  let upload_path = path.join(process.env.DEFAULT_PATH,username,pathname);
  let message;
  try {
    if (!fs.existsSync(upload_path)) {
      fs.mkdirSync(upload_path, {
        recursive: true,
      });
    }
  } catch (error) {
    console.log(error);
  }

  console.log(upload_path);
  console.log(fs.existsSync(upload_path));
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
    .on("file", async (fileName, file) => {
      console.log("uploading " + file.name, fileName ,"to"+file.path);
    })
    .on("end", () => {
      console.log("======> upload done");
      message = "Upload Complete";
    })
	.on("error", (error) => {
		console.log(error);
	})
  form.parse(req);
  res.status(200).send(message);
}



module.exports = {
  Upload,
};
