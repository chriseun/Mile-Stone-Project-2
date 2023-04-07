import express from 'express';
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from './users.js';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({})
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

//verify token will allow only people with access to create recipes
router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.json(err);
  }
});

//verify token will allow only people with access to edit recipes
router.put("/", verifyToken, async (req, res) => {
  //userId -which user we want to change their saved recipes, recipeId to insert in that array
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID)
    const user = await UserModel.findById(req.body.userID)
    // await recipe.save();
    user.savedRecipes.push(recipe);
    await user.save();
    //updated list of saved recipes
    res.json({savedRecipes: user.savedRecipes});
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedRecipes/ids/:userID", async (req, res) =>{
  try{
      const user = await UserModel.findById(req.params.userID);
      res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
      res.json(err);
  }
});


router.get("/savedRecipes/:userID", async (req, res) =>{
  try{
    //user = trying to find a user by finding by ID
      const user = await UserModel.findById(req.params.userID)
      const savedRecipes = await RecipeModel.find({
        _id: { $in: user.savedRecipes },
      });
      res.json({ savedRecipes })
  } catch (err) {
      res.json(err);
  }
});

export { router as recipesRouter }
