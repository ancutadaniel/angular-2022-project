import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { Ingredient } from "../../shared/ingredient.model";

import * as ShoppingListActions from "../store/shopping-list.actions";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") slForm: NgForm;

  subscription: Subscription;
  editMode: boolean = false;

  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    // select from store the state
    this.subscription = this.store
      .select("shoppingList")
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;

          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(f: NgForm) {
    const { name, amount } = f.value;
    const newIngredient = new Ingredient(name, amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.slService.addIngredient(newIngredient);
    }

    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    // this.slService.removeIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }
}
