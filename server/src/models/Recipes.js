import mongoose from "mongoose";

// object that is going to define the structure of our data
const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  //[] will make sure mongodb will acknowledge ingredients has an array of objects/strings
  ingredients: [{type: String, required: true}],
  instructions: { type: String, required: true},
  imageUrl: { type: String, required: true},
  cookingTime: { type: Number, required: true},
  userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true}
});

export const RecipeModel = mongoose.model("recipes", RecipeSchema)
