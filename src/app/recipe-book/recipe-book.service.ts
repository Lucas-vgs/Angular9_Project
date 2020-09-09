import { Injectable } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeBookService {

  recipesListChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('Cake',
  //     'Nice cake',
  //     'https://i2.wp.com/www.sugarspunrun.com/wp-content/uploads/2018/01/Vanilla-Cake-Recipe-1-of-1.jpg',
  //     [
  //       new Ingredient('Sugar', 10),
  //       new Ingredient('Flour', 5),
  //       new Ingredient('Chocolat', 3),
  //     ]
  //   ),
  //   new Recipe('Pie',
  //     'Tastefull Pie',
  //     'https://images-gmi-pmc.edge-generalmills.com/94323808-18ab-4d37-a1ef-d6e1ff5fc7ae.jpg',
  //     [
  //       new Ingredient('Egg', 11),
  //       new Ingredient('Flour', 5),
  //       new Ingredient('Apple', 6),
  //     ]
  //   ),
  // ];
  private recipes : Recipe[] = [];


  constructor(private serviceShopping: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(index: number): Recipe {
    return this.recipes.slice()[index]
  }

  sendIngredients(el: Ingredient[]) {
    this.serviceShopping.addIngredientsArray(el);
  }

  addRecipe(rec: Recipe) {
    this.recipes.push(rec);
    this.recipesListChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, rec: Recipe) {
    this.recipes[index] = rec;
    this.recipesListChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesListChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesListChanged.next(this.recipes.slice());
  }

  deleteIngredient(recipeIndex: number, ingredientIndex: number) {
    this.recipes[recipeIndex].ingredients.splice(ingredientIndex, 1);
  }

}
