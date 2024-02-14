const Student = require('../model/user.model');
const bcrypt = require("bcrypt")
const cloudinary = require('cloudinary');
          
cloudinary.config({ 
  cloud_name: 'dubaep0qz', 
  api_key: '257212389221118', 
  api_secret: 'Pq6--RYn75xxzkNNFrdHaOTgWfM' 
});

const displayWelcome = (req,res) =>{
  res.send('Welcome to the homepage!');
  // console.log("hello"); 
}

const aboutUser = (req, res)=>{
  let user = [{
    firstName : "Joshua",
    gender: "male",
    phone: "android",
    country: "India",
    state: "Tamil Nadu",
    mobile: "9876543210",
  }]
  res.send(user)
}

const register = (req,res) =>{
  console.log(req.body);
  let student = new Student(req.body)
  student.save()
  .then((user)=>{
    console.log("saved successfully");
  }).catch((err)=>{
    console.log(err);
  })
}

const login = (req, res) => {
  const { email, password } = req.body;
  
  Student.findOne({ email })
    .then(student => {
      if (!student) {
        console.log( "User not found" );
      }

      bcrypt.compare(password, student.password)
        .then((match) => {
          if (!match) {
            console.log("User not found");
          }else{
            console.log("Login successful" );
          }
        })
        .catch((err) => {
          console.log(err)
        });
    })
    .catch((error) => {
      console.log(error)
    });
};

const upload = (req, res) =>{
  console.log(req.body);
  let image = req.body.myFile
  cloudinary.uploader.upload(image,((result, err)=>{
    let storedImage = result.secure_url;
    res.send({message: "image uploaded successfully", status: true, storedImage})
  }));
}

module.exports = {displayWelcome,aboutUser, register, login, upload}