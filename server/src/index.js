
import express from "express";
//rules that set up between front end and back end cors
import cors from 'cors'
//mongoDB- database management system
import mongoose from 'mongoose'

import { userRouter } from './routes/users.js'
import { recipesRouter } from './routes/recipes.js'


const app = express()

//converting to json
app.use(express.json());
//solving issues when getting APIS from front end
app.use(cors());

//whatever endpoints using from users.js, it will start from /auth route
app.use("/auth", userRouter);
//whatever endpoints using from recipes.js, it will start from /recipes route
app.use("/recipes", recipesRouter);

//connects with mongoose atlas
mongoose.connect("mongodb+srv://chrisleosteve:thriveDXproject@recipes.ndyizjb.mongodb.net/recipes?retryWrites=true&w=majority")
//tells api to start
app.listen(3001, ()=> console.log("SERVER STARTED!"))
