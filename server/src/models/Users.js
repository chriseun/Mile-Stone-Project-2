//how this user connection will look like through mongoose
import mongoose from "mongoose";
//the structure of our data
const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  //password doesn't need to be unique
  password: {type: String, required: true},
});
//"users" will be the table or collection called inside of our database

export const UserModel = mongoose.model("users", UserSchema)
