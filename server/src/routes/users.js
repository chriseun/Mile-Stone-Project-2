//this file will encompass everything to logging-in and registering
import express from 'express'
//jwt is used for authorization- authorizing this user has access to this system with its own secret key
//with the jwt,, the user information is stored inside the jwt instead of being stored in the server
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js'


const router = express.Router()

//register route
router.post("/register", async(req, res) => {
  //this is the body of the request
  const { username, password } = req.body

  //UserModel from './models.User.js'
  //we are making a request to UserModel
  //findOne() = function that is calling one user
  //'username: username' = username
  //.then .catch or async await
  const user = await UserModel.findOne({ username });

  //if user is already inside the database from registering
  if (user) {
    //we are returning that user already exists
    return res.json({message: "User already exists!"});
  }

  //creating a password that is hashed for less probabilty of password leakage
  const hashedPassword = await bcrypt.hash(password, 10)

  //we want to add the user to our database with the new hashed password
  const newUser = new UserModel({username, password: hashedPassword})
  //this will create a new user
  await newUser.save()

  //we are going to send back a json
  //new user created!
  res.json({message: "User Registerd Successfully!"})
})


//login route
router.post("/login", async (req, res) =>{
  //when you login, you will need a user name and a password
   const { username, password } = req.body
  //we will try to find a user this username below
   const user = await UserModel.findOne({ username });

   //if the username is NOT in the registry
   if (!user){
    return res.json({message: "User Doesn't Exist!"})
   }

   //we will use bcrypt to determine this
   //you cannot actually UN-hash a password that has already been hashed
   //we are comparing with the hashed password
   const isPasswordValid = await bcrypt.compare(password, user.password)

   //if the password does not match the hashed password
   if (!isPasswordValid) {
    return res.json({message: "Username or Password is Incorrect!"})
   }

   //if the username and password valid
   //how we create web tokens using json web tokens jwt
   //secret for our tokens
   const token = jwt.sign({id: user._id}, "secret");
   //we put it in userID so we can store it in our project
   res.json({token, userID: user._id})

})
//the token will prove that they are the already authenticated users




//we will have more than one router so we name it userRouter
export { router as userRouter };
