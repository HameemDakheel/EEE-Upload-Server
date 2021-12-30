const Path = require("path");
const fs = require("fs");
const extname = Path.extname;
const archiver = require("archiver");
const defaultPath = process.env.DEFAULT_PATH;
const trashPath = process.env.TRASH_PATH;
const logger =require('../config/logger');

function getDefaultTree(req, res) {
  var dirPath = req.query.path || "/";
  var dirStats = fs.statSync(Path.join(defaultPath, dirPath));
  var arr = [];
  if (dirStats.isDirectory()) {
    try {
      var data = fs.readdirSync(Path.join(defaultPath, dirPath));
      data.forEach((name) => {
        let { atimeMs, size } = fs.statSync(
          Path.join(defaultPath, dirPath, name)
        );
        let type = extname(name) ? "file" : "directory";
        arr.push({ name, dirPath, atimeMs, size, type });
      });
      return res.status(200).json(arr);
    } catch (e) {
      logger.error(e);
      return res.status(500).json({ error: "true", message: e.message });
    }
  }
  return res
    .status(404)
    .json({ error: "true", message: "this is not a directory" });
}

function downloadFiles(req, res) {
  var data = JSON.parse(req.query.data);
  const zip = archiver("zip");
  res.status(200).set("Content-Type", "application/zip");
  res.set(
    "Content-Disposition",
    `attachment; filename=${
      Path.basename(data.path) || Path.basename(defaultPath)
    }.zip`
  );
  zip.pipe(res);
  let path = Path.join(defaultPath, data.path);
  for (let name of data.names) {
    if (!extname(name)) {
      zip.directory(Path.join(path, name), name);
    } else {
      zip.file(Path.join(path, name), { name });
    }
  }
  zip.finalize();
  zip.on('finish',()=>{
        logger.verbose(`${extname(path)} have been ziped and downloaded `);
  })
  zip.on("error", function (err) {
    logger.error(err);
    res.end();
  });
}

function downloadOneFile(req, res) {
  var isFile = fs.statSync(Path.join(defaultPath, req.query.file)).isFile();
  if (isFile) {
    logger.verbose(
      `someone had just download ${req.query.file}`
    );
    return res.status(200).download(Path.join(defaultPath, req.query.file));
  }
  return res
    .status(403)
    .json({ error: "true", message: "this is not a A file" });
}

function deleteFile(req, res) {
  const username = req.decoded.payload.username;
  const { path, filename } = req.body;
  const oldPath = Path.join(defaultPath, username, path, filename);
  const newPath = Path.join(trashPath, username);
    try {
      if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath, {
          recursive: true,
        });
      }
    } catch (error) {
      logger.error(error);
    }
  try {
    var isFile = fs.statSync(oldPath).isFile();
    if (isFile) {
      fs.rename(oldPath, Path.join(newPath, filename),(err) => {
        if (err) {
          logger.error(err);
          return res.status(500).json({error: "true", message: "Delete failed"});
        }
        logger.warn(`${username} just deleted ${filename} successfully`);
          return res
            .status(200)
            .json({ error: "", message: "Delete success" });
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: "true", message: "Delete failed" });
  }
}

module.exports = {
  getDefaultTree,
  downloadFiles,
  downloadOneFile,
  deleteFile,
};
