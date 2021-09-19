const testFolder = "/home/hameema/Downloads/";
const fs = require("fs");
const path = require('path');
const arr = [];
try {
	const data = fs.readdirSync(testFolder);
	data.forEach((name)=>{
		let {atimeMs,size,isDirectory,isFile} = fs.statSync(path.join(testFolder,name));
		let type = path.extname(name)?"file":"directory";
		arr.push({ name,path:'/', atimeMs,size,type});
	})
	console.log(arr);

} catch (error) {
console.error(error);
}
