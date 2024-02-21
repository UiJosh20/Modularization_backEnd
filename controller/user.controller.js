const express = require('express');
const router = express.Router();
const Student = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cloudinary = require('cloudinary');

const displayWelcome = (req, res) => {
  res.send('Welcome to the homepage!');
};

const aboutUser = (req, res) => {
  let user = [{
    firstName: "Joshua",
    gender: "male",
    phone: "android",
    country: "India",
    state: "Tamil Nadu",
    mobile: "9876543210",
  }];
  res.send(user);
};

const register = (req, res) => {
  console.log(req.body);
  let student = new Student(req.body);
  student.save()
    .then((user) => {
      console.log("saved successfully");
      res.send("Saved successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

const login = (req, res) => {
  const secret = process.env.SECRET;
  const { email, password } = req.body;

  Student.findOne({ email })
    .then(student => {
      if (!student) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found" });
      }

      bcrypt.compare(password, student.password)
        .then((match) => {
          if (!match) {
            console.log("Incorrect password");
            return res.status(401).json({ message: "Incorrect password" });
          }

          // Generate the token
          const token = jwt.sign({ email }, secret, { expiresIn: '1h' });

          // Send the response with the token and user information
          res.send({ message: "User signed in successfully", status: true, user: student, token: token });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

const upload = (req, res) => {
  console.log(req.body);
  let image = req.body.myFile;
  cloudinary.uploader.upload(image, ((result, err) => {
    console.log(result);
    let storedImage = result.secure_url;
    res.send({ message: "image uploaded successfully", status: true, storedImage });
  }));
};

const verifyToken = (req, res)=>{
  const { token } = req.body;
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err);
    } else {
      console.log(decoded);
      console.log('Token verified successfully');
      res.send({ message: "Token verified successfully", status: true, decoded: decoded, valid:true, token:token });
    }
  });
}
module.exports = {displayWelcome,aboutUser, register, login, upload, verifyToken}