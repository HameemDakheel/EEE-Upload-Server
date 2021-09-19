const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

function getUsers(req, res) {
  User.find({}, (err, users) => {
    users.map((user) => {
      if (user.privileges === "admin") {
        return;
      } else {
        return user;
      }
    });
    if (err || users.length)
      return res.status(400).json({ error: "true", message: err.message });
    return res.status(200).json({ users });
  });
}

function login(req, res) {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(401)
      .json({ error: "true", message: "all fields are required" });
  }
  User.findOne({ userName: username }, function (err, user) {
    if (err || !user) {
      return res
        .status(401)
        .json({ error: "true", message: err || "user does not exist" });
    } else if (user.checkPassword(password)) {
      return res.status(200).json({
        error: "",
        message: "login success",
        token: user.generateToken(),
        // user: user,
      });
    } else {
      return res.status(401).json({ error: "true", message: "wrong password" });
    }
  });
}

function register(req, res) {
  const { username, password, path } = req.body;
  if (!username || !password || !path)
    return res
      .status(401)
      .json({ error: "true", message: "all fields are required" });
  try {
    const user = new User();
    user.userName = username;
    user.setPassword(password);
    user.defaultPath = path;
    let token = user.generateToken();
    user.save();
    console.log("user created :", user);
    res.status(200).json({ user, token });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "true", message: e.message });
  }
}

function deleteUser(req, res) {
  if (!req.body.username) {
    return res
      .status(401)
      .json({ error: "true", message: "all fields are required" });
  }
  User.findOneAndDelete({ userName: req.body.username }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "true", message: err });
    } else {
      return res.status(200).json({ error: "", message: "user deleted" });
    }
  });
}

function updateUser(req, res) {
  const { username, password, path } = req.body;
  if (!username || !password || !path) {
    return res
      .status(401)
      .json({ error: "true", message: "all fields are required" });
  }
  User.findOneAndUpdate({ userName: username }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "true", message: err || "user not found" });
    } else {
      try {
        user.userName = username;
        user.setPassword(password);
        user.path = path;
        user.save();
        return res.status(200).json({ message: "user updated", user });
      } catch (e) {
        return res.status(500).json({ error: "true", message: e.message });
      }
    }
  });
}

function checkToken(req, res, next) {
  let token = req.body.token || req.headers["x-access-token"];
  var decode = jwt.verify(token, process.env.JWT_SECRET);
  var decoded = jwt.decode(token, { complete: true });
  if (decode) {
    // return res.status(200).json({decode,decoded});
    if (req.path === "/user/check-token") {
      return res
        .status(200)
        .json({ error: "", message: "token is valid", decode });
    } else {
      req.decoded = decoded;
      next();
    }
  } else {
    return res.status(401).json({ error: "true", message: "token is invalid" });
  }
}

function checkPrivileges(req, res, next) {
  const decoded = req.decoded;
  User.findOne({ userName: decoded.username }, (err, user) => {
    if (err || !user) {
      return res
        .status(403)
        .json({ error: "true", message: err || "user not found" });
    }
    if (user.privileges === "admin") {
      next();
    } else {
      return res.status(403).json({ error: "true", message: "Forbidden" });
    }
  });
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
