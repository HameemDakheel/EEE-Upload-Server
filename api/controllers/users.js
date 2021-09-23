const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

function getUsers(req, res) {
  const message= "";
  User.find({}, (err, users) => {
    var data= [];
    users.map((user) => {
      if (user.privileges === "admin") {
        return;
      } else {
        data.push({ username: user.userName, path: user.defaultPath });
        return;
      }
    });
    if (err || users.length<=0){
      return res.status(400).json({ error: "true", message: err });
    }

    return res.status(200).json({ data });
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
        username: user.userName,
      });
    } else {
      return res.status(401).json({ error: "true", message: "wrong password" });
    }
  });
}

function register(req, res) {
  const { username, password, path } = req.body;
  console.log(req.body);
  User.findOne({ userName: username }, function (err, user) {
    if (err || user) {
      return res.status(403).json({ error: "true", message:"user already exists" });
    }
  })
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
    res.status(200).json({ error: "", message: "user created" });
  } catch (e) {
    console.error(e.message);
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
  const { username, path } = req.body;
  if (!username || !path) {
    return res
    .status(401)
    .json({ error: "true", message: "all fields are required" });
  }
  User.findOne({ userName: username }, (err, user) => {
    console.log("here is user",username,path);
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "true", message: err || "user not found" });
    } else {
      try {
        user.userName = username;
        user.defaultPath = path;
        user.save();
        return res.status(200).json({ message: "user updated", user });
      } catch (e) {
        return res.status(500).json({ error: "true", message: e.message });
      }
    }
  });
}

function checkToken(req, res, next) {
  try {
    let token = req.body.token? req.body.token : req.headers["authorization"].split(" ")[1];
    console.log( token);
    var decode = jwt.verify(token, process.env.JWT_SECRET);
    var decoded = jwt.decode(token, { complete: true });
    console.log(decoded);
    if (decode) {
      if (req.path === "/user/check-token") {
        return res
          .status(200)
          .json({ error: "", message: "token is valid", decode:{username: decode.username, privileges:decode.privileges} });
      } else {
        req.decoded = decoded;
        console.log("yep");
        next();
      }
    }
  } catch (e) {
    console.log(e.message);
    return res.status(401).json({ error: "true", message: "token is invalid" });
  }
}

function checkPrivileges(req, res, next) {
  const user = req.decoded.payload;
  if (user.privileges === "admin"){
    console.log("an other admin");
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
