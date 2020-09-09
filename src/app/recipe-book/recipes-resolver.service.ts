import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DataStorageService } from '../shared/Services/data-storage.service';
import { Recipe } from './models/recipe.model';
import { RecipeBookService } from './recipe-book.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(
    private dataStorageService: DataStorageService,
    private recipeBookService: RecipeBookService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const recipes = this.recipeBookService.getRecipes();
    if (recipes.length < 1) {
      return this.dataStorageService.fetchData();
    } else return recipes;

  }
}
