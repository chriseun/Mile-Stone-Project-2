import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import { useCookies } from "react-cookie";


export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);


  const userID = useGetUserID();
  useEffect(() => {

    const fetchRecipe = async () => {
      try{
      const response = await axios.get("http://localhost:3001/recipes");
      //response.data should return back the list of recipes
      setRecipes(response.data)
      console.log(response.data)
    } catch (err) {
      console.error(err);
      }
    }

    const fetchSavedRecipes = async () => {
      try{
      const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
      //response.data should return back the list of recipes
      setSavedRecipes(response.data.savedRecipes)
    } catch (err) {
      console.error(err);
      }
    }

    fetchRecipe();

    if (cookies.access_token) fetchSavedRecipes();
  }, []);

  //saving recipe
  const saveRecipe = async (recipeID) =>{
      try{
      const response = await axios.put("http://localhost:3001/recipes",
      {
         recipeID,
         userID,
      },
      { headers: { authorization: cookies.access_token }}
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
      }
  }

  const isRecipeSaved = (id) => savedRecipes.includes(id);



  return (
  <div>
    <h2> Recipes</h2>
    <ul>
      {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className='ingredients'>
              <h3>Ingredients</h3>
              <ul>{recipe.ingredients}</ul>
            </div>
            <div className='instructions'>
              <h3>Instructions</h3>
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name}/>
            <p> Cooking Time: {recipe.cookingTime} minutes</p>
          </li>

      ))}
    </ul>
  </div>
  );
};
