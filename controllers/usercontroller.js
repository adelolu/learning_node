const usermodel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const { useremail } = require("../utils/nodemailer");

const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).send({ message: "input cannot be empty", status: false });
    } else {
      const existuser = await usermodel.findOne({ email: email });
      if (existuser) {
        res.status(402).send({ message: "user already exist", status: false });
      } else {
        let hashpassword = await bcrypt.hash(password, 1);
        const newuser = await usermodel.create({
          username,
          email,
          password: hashpassword,
        });
        await useremail(email, username);
        if (newuser) {
          res.status(200).send({ message: "signup successful", status: true });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message, status: false });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ message: "input cannot be empty", status: false });
    } else {
      const existuser = await usermodel.findOne({ email: email });

      if (!existuser) {
        res
          .status(400)
          .send({ message: "Account does not exist", status: false });
      } else {
        let correctpassword = await bcrypt.compare(
          password,
          existuser.password
        );
        if (correctpassword === true) {
          const token = await jwt.sign({ email }, "secretKey", {
            expiresIn: "1d",
          });

          res
            .status(200)
            .send({ message: "login successful", status: true, token });
        } else {
          res
            .status(400)
            .send({ message: "Incorrect password", status: false });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.message, status: false });
  }
};
const verifydashboard = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(402).send({ message: "invalid token", status: false });
    } else {
      const verifyToken = await jwt.verify(token, "secretKey");

      const email = verifyToken.email;
      const verifyuser = await usermodel.findOne({ email });
      if (verifyuser) {
        res.status(200).send({ message: "user is verified", status: true });
      }
    }
  } catch (error) {
    console.log(error);
    if (error.message === "jwt malformed") {
      res.status(402).send({ message: "incorrect token", status: false });
    } else {
      res.status(500).send({ message: error.message, status: false });
    }
  }
};

const UploadProfile = async (req, res) => {
  try {
    let { imageFile } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    if (!imageFile) {
      return res
        .status(400)
        .send({ message: "image file cant be empty", status: false });
    }
    const verifyToken = await jwt.verify(token, "secretKey");
    console.log(verifyToken);

    if (!verifyToken) {
      return res.status(400).send({ message: "Invalid token", status: false });
    }
    const email = verifyToken.email;
    const image = await cloudinary.uploader.upload(imageFile);
    const user = await usermodel.findOneAndUpdate(
      { email },
      { profileImage: image.secure_url },
      { new: true }
    );
    if (!user) {
      return res
        .status(500)
        .send({ message: "Image not uploadad", status: false });
    }
    return res.status(401).send({ message: "Profile updated", status: false });

    console.log(user);
  } catch (error) {
    console.log(error);
    if (error.message === "jwt malformed") {
      res.status(402).send({ message: "incorrect token", status: false });
    } else {
      res.status(500).send({ message: error.message, status: false });
    }
  }
};
module.exports = { Signup, Login, verifydashboard, UploadProfile };
