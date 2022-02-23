import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
export const ADD_INGREDIENT = "[Shopping list] Add Ingredient";
export const ADD_INGREDIENTS = "[Shopping list] Add Ingredients";
export const UPDATE_INGREDIENT = "[Shopping list] Update Ingredient";
export const DELETE_INGREDIENT = "[Shopping list] Delete Ingredient";
export const START_EDIT = "[Shopping list] Start Edit";
export const STOP_EDIT = "[Shopping list] Stop Edit";

export class AddIngredient implements Action {
  readonly type: string = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}
export class AddIngredients implements Action {
  readonly type: string = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type: string = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}
export class DeleteIngredient implements Action {
  readonly type: string = DELETE_INGREDIENT;
  constructor(public payload?: any) {}
}

export class StartEdit implements Action {
  readonly type: string = START_EDIT;
  constructor(public payload: number) {}
}
export class StopEdit implements Action {
  readonly type: string = STOP_EDIT;
  constructor(public payload?: any) {}
}

export type ShoppingListActionsType =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
