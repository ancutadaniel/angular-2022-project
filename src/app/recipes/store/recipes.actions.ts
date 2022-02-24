import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPES = "[Recipes] Set Recipes";
export const FETCH_RECIPES = "[Recipes] Fetch Recipes";
export const ADD_RECIPES = "[Recipes] Add Recipes";
export const DELETE_RECIPES = "[Recipes] Delete Recipes";
export const UPDATE_RECIPES = "[Recipes] Update Recipes";
export const STORE_RECIPES = "[Recipes] Store Recipes";

export class SetRecipes implements Action {
  readonly type: string = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type: string = FETCH_RECIPES;
  constructor(public payload?: any) {}
}

export class AddRecipe implements Action {
  readonly type: string = ADD_RECIPES;
  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type: string = UPDATE_RECIPES;
  constructor(public payload: { idx: number; newRecipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type: string = DELETE_RECIPES;
  constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
  readonly type: string = STORE_RECIPES;
  constructor(public payload?: any) {}
}

export type RecipesActions =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes;
