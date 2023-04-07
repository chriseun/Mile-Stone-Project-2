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

  //we are going to send back a json
  res.json(user)
})


//login route
router.post("/login")




//we will have more than one router so we name it userRouter
export { router as userRouter };
