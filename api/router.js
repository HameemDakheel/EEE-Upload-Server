const router = require("express").Router();
const userController = require("./controllers/users");

router.post("/user/check-token", userController.checkToken);
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
