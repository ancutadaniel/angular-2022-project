import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subject, Subscription } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";

import * as ShoppingListActions from "./store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // type of the observable should be like store below {ingredients: Ingredients[]}
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  // private ingredientsChangedSubject: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    // here ingredients is an observable - we need to update template
    // (ingredients | async) for iterate on observable
    this.ingredients = this.store.select("shoppingList");
    // this.ingredients = this.slService.getIngredients();
    // this.ingredientsChangedSubject =
    //   this.slService.ingredientsChanged.subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
  }

  onEditItem(i: number) {
    // this.slService.startedEditing.next(i);
    this.store.dispatch(new ShoppingListActions.StartEdit(i));
  }

  ngOnDestroy(): void {
    // this.ingredientsChangedSubject.unsubscribe();
  }
}
