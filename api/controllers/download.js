const getDirTree = require("directory-tree");
const path = require("path");
const defaultPath = process.env.DEFAULT_PATH;	


function getDefaultTree(req ,res) {
	try {
		var dirTree = getDirTree(path.normalize(path.join(defaultPath, req.path)),{attributes:['mtime','atimeMs']});
    return res.status(200).json({dirTree});
	} catch (e) {
		return res.status(500).json({ error: "true", message:e.message});
	}
}

function download(req, res)	{

}

module.exports ={
	getDefaultTree,
	download,
}