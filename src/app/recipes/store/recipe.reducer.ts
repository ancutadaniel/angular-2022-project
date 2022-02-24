import { Recipe } from "../recipe.model";
import * as RecipesActions from "./recipes.actions";

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipesReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };

    case RecipesActions.ADD_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };

    case RecipesActions.UPDATE_RECIPES:
      const updatedRecipe = {
        ...state.recipes[action.payload.idx],
        ...action.payload.newRecipe,
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.idx] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes,
      };

    case RecipesActions.DELETE_RECIPES:
      return {
        ...state,
        recipes: state.recipes.filter(
          (_recipe, index) => index !== action.payload
        ),
      };

    default:
      return state;
  }
}
