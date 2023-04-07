//this file will encompass everything to logging-in and registering
import express from 'express'
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
router.post("/login")




//we will have more than one router so we name it userRouter
export { router as userRouter };
