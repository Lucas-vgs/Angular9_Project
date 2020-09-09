import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeBookService } from 'src/app/recipe-book/recipe-book.service';
import { Recipe } from 'src/app/recipe-book/models/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipesService: RecipeBookService,
    private authService: AuthService
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
        tap(recipes => { this.recipesService.setRecipes(recipes) }))
  }

}
