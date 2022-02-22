import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService
  ) {}
  url = `https://angular-http-65b41-default-rtdb.firebaseio.com/`;
  error = new Subject<string>();

  createAndStoreRecipes() {
    // Send Http request , request are send if you subscribe
    // http.post is an observable
    // after the method you can define the type (post<Type> => come from response)

    const recipes = this.recipesService.getRecipes();

    this.http.put(this.url + "recipes.json", recipes).subscribe(
      (responseData) => {
        console.log(responseData);
      },
      (error) => {
        this.error.next(error.message);
      }
    );
  }

  fetchRecipes() {
    // with take here we say that we want one val form observer and then unsubscribe
    // get user only once

    return this.http.get<Recipe[]>(this.url + "recipes.json").pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipesService.setRecipes(recipes);
      })
    );
  }
}
