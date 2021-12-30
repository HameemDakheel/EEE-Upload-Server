const router = require("express").Router();
const userController = require("./controllers/users");
const downloadController = require("./controllers/download");
const uploadController = require("./controllers/upload");

router.get('/', (req, res) =>{ res.render('index'); });
router.get("/dir-tree", downloadController.getDefaultTree);
router.get("/download", downloadController.downloadOneFile);
router.get("/download-all", downloadController.downloadFiles);
router.post("/user/check-token", userController.checkToken);
router.post(
  "/upload/:username",
  userController.checkToken,
  uploadController.Upload
);
router.post(
  "/delete-file",
  userController.checkToken,
  downloadController.deleteFile
);
router.post("/user/login", userController.login);
router.post(
  "/user/register",
  userController.checkToken,
  userController.checkPrivileges,
  userController.register
);
router.post(
  "/user/edit",
  userController.checkToken,
  userController.checkPrivileges,
  userController.updateUser
);
router.post(
  "/user/delete",
  userController.checkToken,
  userController.checkPrivileges,
  userController.deleteUser
);
router.post(
  "/user/get-users",
  userController.checkToken,
  userController.checkPrivileges,
  userController.getUsers
);

module.exports = router;
