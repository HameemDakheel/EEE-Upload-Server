const mongoose = require("mongoose");
const User = require("../modules/users");
const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const Path = require("path");
const defaultPath = process.env.DEFAULT_PATH;
const trashPath = process.env.TRASH_PATH;
const fs = require("fs");
const formidable = require("formidable");

//Done
function getUsers(req, res) {
  const message = "";
  User.find({}, (err, users) => {
    var data = [];
    users.map((user) => {
      if (user.privileges === "admin") {
        return;
      } else {
        data.push({ username: user.username, path: user.defaultPath });
        return;
      }
    });
    if (err || users.length <= 0) {
      return res.status(400).json({ error: "true", message: err });
    }

    return res.status(200).json({ data });
  });
}

//DONE
function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(401)
      .json({ error: "true", message: "all fields are required" });
  }
  User.findOne({ username: username }, function (err, user) {
    if (err || !user) {
      return res
        .status(401)
        .json({ error: "true", message: err || "user does not exist" });
    } else if (user.checkPassword(password)) {
      logger.info(`${username} logged in`);
      return res.status(200).json({
        error: "",
        message: "login success",
        token: user.generateToken(),
        username: user.username,
      });
    } else {
      return res.status(401).json({ error: "true", message: "wrong password" });
    }
  });
}

//DONE
function register(req, res) {
  const { username, password, path } = req.body;
  if (!username || !password || !path)
    return res
      .status(401)
      .json({ error: "true", message: "all fields are required" });
  var userAlreadyExsit = User.findOne(
    { username: username },
    function (err, user) {
      console.log("hi", err, user);
      if (err || user) {
        return true;
      } else {
        return false;
      }
    }
  );
  if (userAlreadyExsit) {
    return res
      .status(403)
      .json({ error: "true", message: "user already exists" });
  } else {
    try {
      const user = new User();
      user.username = username;
      user.setPassword(password);
      user.defaultPath = path || "/";
      let realPath = Path.join(defaultPath, path);
      if (!fs.existsSync(realPath)) {
        fs.mkdirSync(realPath);
      }
      user.save();
      logger.info(`${req.decoded.payload.username} add new user ${username}`);
      res.status(200).json({ error: "", message: "user created" });
    } catch (e) {
      console.log(e.message);
      logger.error(e.message);
      res.status(400).json({ error: "true", message: e.message });
    }
  }
}

//DONE
function deleteUser(req, res) {
  if (!req.body.username) {
    return res
      .status(401)
      .json({ error: "true", message: "all fields are required" });
  }
  User.deleteOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "true", message: err });
    } else {
      logger.warn(
        `${req.body.username} has been deleted by ${req.decoded.payload.username}`
      );
      return res.status(200).json({ error: "", message: "user deleted" });
    }
  });
}

//DONE
function updateUser(req, res) {
  const { oldUsername, username, oldPath, path } = req.body;
  if (!username || !path || !oldUsername || !oldPath) {
    return res
      .status(401)
      .json({ error: "true", message: "all fields are required" });
  }

  User.findOne({ username: oldUsername }, (err, user) => {
    if (err || !user) {
      log;
      return res
        .status(400)
        .json({ error: "true", message: err || "user not found" });
    } else {
      try {
        user.username = username;
        user.defaultPath = path;
        user.save();
        logger.warn(
          `${req.body.username} has been updated by ${req.decoded.payload.username}`
        );
        return res.status(200).json({ message: "user updated", user });
      } catch (e) {
        logger.error(e);
        return res.status(500).json({ error: "true", message: e.message });
      }
    }
  });
}

//DONE
function checkToken(req, res, next) {
  try {
    let token = req.body.token
      ? req.body.token
      : req["headers"].authorization.split(" ")[1];
    var decode = jwt.verify(token, process.env.JWT_SECRET);
    var decoded = jwt.decode(token, { complete: true });
    if (decoded) {
      if (req.path === "/user/check-token") {
        return res.status(200).json({
          error: "",
          message: "token is valid",
          decode: {
            username: decode.username,
            privileges: decode.privileges,
          },
        });
      } else {
        req.decoded = decoded;
        next();
      }
    }
  } catch (e) {
    console.log(e.message);
    return res.status(401).json({ error: "true", message: "token is invalid" });
  }
}

//DONE
function checkPrivileges(req, res, next) {
  const user = req.decoded.payload;
  if (user.privileges === "admin") {
    next();
  } else {
    return res.status(403).json({ error: "true", message: "Forbidden" });
  }
}

module.exports = {
  login,
  register,
  updateUser,
  deleteUser,
  checkToken,
  checkPrivileges,
  getUsers,
};
