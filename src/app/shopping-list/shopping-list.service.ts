import { Ingredient } from "../shared/ingredient.model";
// import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export class ShoppingListService {
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(idx: number) {
    return this.ingredients[idx];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(idx: number, newIngredient: Ingredient) {
    this.ingredients[idx] = newIngredient;
    this.ingredientsChanged.next([...this.ingredients]);
  }

  removeIngredient(idx: number) {
    this.ingredients.splice(idx, 1);
    this.ingredientsChanged.next([...this.ingredients]);
  }
}
