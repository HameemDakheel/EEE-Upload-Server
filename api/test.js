const testFolder = "/home/hameema/Downloads/h/LICENSE.md";
const path = "/home/hameema/.trash/LICENSE.md";
const fs = require("fs");
// const path = require('path');
// const arr = [];
// try {
// 	const data = fs.readdirSync(testFolder);
// 	data.forEach((name)=>{
// 		let {atimeMs,size,isDirectory,isFile} = fs.statSync(path.join(testFolder,name));
// 		let type = path.extname(name)?"file":"directory";
// 		arr.push({ name,path:'/', atimeMs,size,type});
// 	})
// 	console.log(arr);

// } catch (error) {
// console.error(error);
// }

fs.rename(testFolder,path, (err) => {
	if (err) console.error(err);
	console.log("it is done!");
})