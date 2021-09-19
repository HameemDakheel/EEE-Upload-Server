const Path = require("path");
const fs = require('fs');
const extname = Path.extname;
const archiver = require('archiver');
const defaultPath = process.env.DEFAULT_PATH;


function getDefaultTree(req ,res) {
  var dirPath = req.query.path || '/'
  var dirStats = fs.statSync(Path.join(defaultPath, dirPath));
  var arr = [];
  if (dirStats.isDirectory()) {

    try {
      var data = fs.readdirSync(Path.join(defaultPath, dirPath));
      data.forEach((name) => {
        let { atimeMs, size } = fs.statSync(
          Path.join(defaultPath,dirPath, name)
      );
      let type = extname(name) ? "file" : "directory";
      arr.push({ name, dirPath, atimeMs, size, type });
    });
    return res.status(200).json(arr);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "true", message:e.message});
  }
}
return res.status(404).json({ error: "true", message:"this is not a directory"});
}

function downloadFiles(req, res)	{
    var data = JSON.parse(req.query.data);
    console.log(JSON.parse(req.query.data));
    const zip = archiver("zip");
    res.status(200).set("Content-Type", "application/zip");
    res.set("Content-Disposition", `attachment; filename=${Path.basename(data.path) || Path.basename(defaultPath)}.zip`);
    zip.pipe(res);
    let path = Path.join(defaultPath, data.path);
    for (let name of data.names) {
      if (!extname(name)) {
        zip.directory(Path.join(path, name), name);
      } else {
        zip.file(Path.join(path, name), { name });
      }
      console.log(name, path);
    }
    zip.finalize();
    zip.on("error", function (err) {
		console.error(err);
    res.end()
	});
}

function downloadOneFile(req,res) {
var isFile = fs.statSync(Path.join(defaultPath, req.query.file)).isFile();
  if (isFile) {
    return res.status(200).download(Path.join(defaultPath, req.query.file));
  }
  return res
    .status(403)
    .json({ error: "true", message: "this is not a A file" });
}



module.exports ={
	getDefaultTree,
	downloadFiles,
  downloadOneFile,
}