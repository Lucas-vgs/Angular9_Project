import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators'

import { RecipeBookService } from 'src/app/shared/Services/recipe-book.service';
import { Recipe } from 'src/app/recipe-book/models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeBookService,
  ) { }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://ng-course-recipe-book-e6466.firebaseio.com/recipes.json', recipes)
      .subscribe((response) => { console.log(response) });
  }

  fetchData() {
    return this.http.get<Recipe[]>('https://ng-course-recipe-book-e6466.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          })
        }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        }));
  }
  private newRecipe: Recipe[] = [];

  fetchDataByEmail(email: string) {
    this.newRecipe = [];
    return this.http.get<Recipe[]>('https://ng-course-recipe-book-e6466.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          })
        }),
        tap(recipes => {
          recipes.forEach( recipe => { if(recipe.email === email) this.newRecipe.push(recipe)})
          this.recipesService.setRecipes(this.newRecipe, email);
        }));
  }

}
