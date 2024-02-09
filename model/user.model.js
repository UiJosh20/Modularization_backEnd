const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const uri = "mongodb+srv://adeyeriseun0:drAnonymous@cluster0.o9g7pm7.mongodb.net/student_db?retryWrites=true&w=majority" 
mongoose.connect(uri)
.then((response)=>{
  console.log("database has connected successfully!");
})
.catch((err)=>{
  console.log(err);
  console.log("There is an error in the database");
})


let studentSchema = mongoose.Schema({
  firstName : String,
  lastName : String,
  email: {type : String, required : true, unique : true},
  password : {type:String, required: true},
 
})

studentSchema.pre("save", function(next){
  bcrypt.hash(this.password, 10, ((err, hash)=>{
    console.log(hash);
    this.password = hash
    next()
  }))
})

let Student = mongoose.model("Student", studentSchema)

module.exports = Student;