const Student = require('../model/user.model');
const bcrypt = require("bcrypt")

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
  
  // Find the student with the given email
  Student.findOne({ email })
    .then(student => {
      if (!student) {
        console.log( "User not found" );
      }

  // Compare the password with the hashed password in mongodb
      bcrypt.compare(password, student.password)
        .then(match => {
          if (!match) {
            console.log("User not found");
          }else{
            console.log("Login successful" );
          }
        })
        .catch(error => {
          console.error(error)
        });
    })
    .catch(error => {
      console.error(error)
    });
};

module.exports = {displayWelcome,aboutUser, register, login}