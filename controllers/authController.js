const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

const secretKey = "secretkeyjwt";

module.exports = {
  registerUser: async (req, res, next) => {
    const { name = "", email = "", password = "", rePassword = "" } = req.body;

    if (name == "" || email == "" || password == "") {
      if (name == "") {
        return res.status(500).json({
          status: 500,
          message: "fill username!",
        });
      }
      if (email == "") {
        return res.status(500).json({
          status: 500,
          message: "fill email!",
        });
      }
      if (password == "") {
        return res.status(500).json({
          status: 500,
          message: "fill password!",
        });
      }
      if (rePassword == "") {
        return res.status(500).json({
          status: 500,
          message: "re-enter password to match!",
        });
      }
    }

    if (password.length < 5) {
      return res.status(500).json({
        status: 500,
        message: "password must be 5 characters minimum",
      });
    }
    if (rePassword != password) {
      return res.status(500).json({
        status: 500,
        message: "password not match!",
      });
    }

    const checkEmail = await User.findOne({
      where: {
        email: email,
      },
    });
    console.log(checkEmail);
    if (checkEmail != null) {
      return res.status(500).json({
        status: 500,
        message: "email taken",
      });
    }

    const encryptedPassword = bcrypt.hashSync(password, 12);
    let roles = "";
    if (req.session.role) {
      roles = req.session.role;
    } else {
      roles = "admin";
    }
    const userRegist = {
      name: name,
      email: email,
      password: encryptedPassword,
      roles: roles,
    };

    const saveRegist = await User.create(userRegist);
    if (saveRegist == null) {
      return res.status(500).json({
        status: 500,
        message: "error register",
      });
    }

    res.status(200).json({
      status: 200,
      message: "success register"
    });
  },

  loginUser: async (req, res) => {
    const { email = "", password = "" } = req.body;

    if (email == "" || password == "") {
      if (email == "") {
        return res.status(500).json({
          status: 500,
          message: "fill email",
        });
      }
      if (password == "") {
        return res.status(500).json({
          status: 500,
          message: "fill password",
        });
      }
    }

    //CHECK USER EXIST OR NOT
    const data = await User.findOne({
      raw: true,
      nest: true,
      where: {
        email: email,
      },
    });
    if (data == null) {
      return res.status(500).json({
        status: 500,
        message: "user not found",
      });
    }

    //CHECK PASSWORD
    const checkPassword = bcrypt.compareSync(password, data.password);
    if (checkPassword == false) {
      return res.status(500).json({
        status: 500,
        message: "wrong username or password",
      });
    }

    // MAKE TOKEN
    const roles = data.roles;

    const accessToken = jwt.sign(
      {
        id: data.id,
        name: data.name,
        roles: roles,
        type: "access_token",
      },
      secretKey,
      { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
      {
        id: data.id,
        name: data.name,
        type: "refresh_token",
      },
      secretKey,
      { expiresIn: "3d" }
    );

    // tambahan
    arr_user = [];
    arr_user.push(data);
    console.log("data ", data);
    req.session.roles = arr_user[0].roles;
    req.session.user_id = arr_user[0].id;
    console.log(req.session);

    res.status(200).json({
      status: 200,
      message: "Success Login",
      name: data.name,
      email: data.email,
      roles: roles,
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  },
};
