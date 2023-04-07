//this file will encompass everything to logging-in and registering
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()

//register route
router.post("/register")


//login route
router.post("login")




//we will have more than one router so we name it userRouter
export { router as userRouter };
