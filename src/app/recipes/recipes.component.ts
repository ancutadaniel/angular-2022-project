import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
})
export class RecipesComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  private selectedRecipeSubj: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.selectedRecipeSubj = this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
      }
    );
  }

  ngOnDestroy(): void {
    this.selectedRecipeSubj.unsubscribe();
  }
}
