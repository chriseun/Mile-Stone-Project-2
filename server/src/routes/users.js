//logging and registering
import express from 'express';
import jwt from 'jsonwebtoken';
//to make passwords complicated
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';

const router = express.Router();

//req is getting data from request res is to send data back to the request
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  //same as { username : username }
  const user = await UserModel.findOne({ username });

  //if existing username registering
  if (user) {
    return res.json({ message: "User already exists!" });
  }

  //using passwords not too common
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();

  //response by sending through json by user
  res.json({ message: "User Registered Successfully" });
});

router.post("/login", async (req, res) =>{
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  //if username is not registered
  if (!user) {
    return res.json({message: "User Doesn't Exist!"});
  }
  //algorithm with hashing will return the same value
  //comparing the password with the original password from the database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid) {
    return res.json({message: "Username or Password Is Incorrect!"})
  }

  const token = jwt.sign({id: user._id}, "secret");
  res.json({token, userID: user._id});
})

//we wil have more than one router
export { router as userRouter };

//middleware
//next will authorize the request to continue
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    //same 'secret on line 47
    jwt.verify(token, "secret", (err) =>{
      //forbidden response - not authorized
      if (err) return res.sendStatus(403);
      next();
    })
  } else {
    res.sendStatus(401);
  }
}
