//framework to create api
import express from 'express'
//library allows you to set up rules to communicate between frontend and backend
//react application to your server
import cors from 'cors'
//for mongodb
import mongoose from 'mongoose'

import { userRouter } from './routes/users.js'


const app = express()
//when getting data from front end, will translate to json
app.use(express.json())
//will solve many issues when trying to make that api request from the front end
app.use(cors())

//seperating our code to './routes/users.js'
//whatever endpoints we use from users.js, we start with /auth route
app.use("/auth", userRouter);

//connecting with mongoose
mongoose.connect("mongodb+srv://chrisleosteve:thriveDXproject@recipes.ndyizjb.mongodb.net/recipes?retryWrites=true&w=majority")

//tells our api to start
app.listen(3001, () => console.log("SERVER STARTED!"))
