const express = require("express");
const router = express.Router();
const uploadCtrl = require("../controllers/upload");
const authCtrl = require("../controllers/authenticate");

router
  .get("/upload", authCtrl.checkToken, uploadCtrl.renderUploadPage)
  .get(
    "/upload/:subjectID/:fileType",
    authCtrl.checkToken,
    (req, res, next) => {
      res.redirect("/upload");
    }
  )
  .post("/upload/:subjectID/:fileType", authCtrl.checkToken, uploadCtrl.Upload);

module.exports = router;
