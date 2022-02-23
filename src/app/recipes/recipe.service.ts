import { EventEmitter, Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";

@Injectable()
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  recipeSelected = new Subject<Recipe>();
  recipesChanges = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Tasty Schnitzel",
  //     "A super-tasty Schnitzel - just awesome!",
  //     "https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG",
  //     [new Ingredient("Meat", 1), new Ingredient("French Fries", 20)]
  //   ),
  //   new Recipe(
  //     "Big Fat Burger",
  //     "What else you need to say?",
  //     "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
  //     [new Ingredient("Buns", 2), new Ingredient("Meat", 1)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    // listen to changes
    this.recipesChanges.next([...this.recipes]);
  }

  constructor(private store: Store<fromApp.AppState>) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes = [...this.recipes, recipe];
    this.recipesChanges.next([...this.recipes]);
  }

  updateRecipe(idx: number, recipe: Recipe) {
    this.recipes[idx] = recipe;

    this.recipesChanges.next([...this.recipes]);
  }

  deleteRecipe(idx: number) {
    this.recipes.splice(idx, 1);
    this.recipesChanges.next([...this.recipes]);
  }
}
