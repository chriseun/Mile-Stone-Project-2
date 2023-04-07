//framework to create api
import express from 'express'
//library allows you to set up rules to communicate between frontend and backend
//react application to your server
import cors from 'cors'
//for mongodb
import mongoose from 'mongoose'


const app = express()
//when getting data from front end, will translate to json
app.use(express.json())
//will solve many issues when trying to make that api request from the front end
app.use(cors())

//tells our api to start
app.listen(3001, () => console.log("SERVER STARTED!"))
