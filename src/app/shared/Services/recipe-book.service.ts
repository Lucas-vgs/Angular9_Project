import { Injectable } from '@angular/core';
import { Recipe } from '../../recipe-book/models/recipe.model';
import { RecipesListService } from '../../shopping-list/recipes-list.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RecipeBookService {

  recipesListChanged = new Subject<Recipe[]>();
  personalRecipesListChanged = new Subject<Recipe[]>();
  errorMessage = new Subject<string>();

  private recipes: Recipe[] = [];
  private personalRecipes: Recipe[] = [];
  email: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  getRecipes(email?: string) {
    if (!email) {
      return this.recipes.slice();
    } else {
      return this.personalRecipes.slice();
    }
  }

  getRecipeById(index: number): Recipe {
    return this.recipes.slice()[index]
  }

  getPersonalRecipeById(index: number): Recipe {
    return this.personalRecipes.slice()[index];
  }

 
  addRecipe(rec: Recipe) {
    if (this.personalRecipes.findIndex(recipe => recipe.name.toUpperCase() === rec.name.toUpperCase()) === -1) {
      this.recipes.push(rec);
      this.recipesListChanged.next(this.recipes.slice());
      this.personalRecipes.push(rec);
      this.personalRecipesListChanged.next(this.personalRecipes.slice())
      this.router.navigate(['../'], { relativeTo: this.route });
    }
    else {
      this.errorMessage.next('We already have a recipe with this name. Please, consider to change it');
    }
  }

  updateRecipe(index: number, rec: Recipe) {
    const oldName = this.personalRecipes[index].name;
    if (rec.name.toUpperCase() === oldName.toUpperCase() ||
      (this.personalRecipes.findIndex(recipe => recipe.name.toUpperCase() === rec.name.toUpperCase())) === -1) {
      this.recipes[this.recipes.findIndex(recipe => recipe.name === this.personalRecipes[index].name
        && recipe.email === this.personalRecipes[index].email)] = rec;
      this.personalRecipes[index] = rec;
      this.personalRecipesListChanged.next(this.personalRecipes.slice());
      this.recipesListChanged.next(this.recipes.slice());
      this.router.navigate(['recipes']);
    } else {
      this.errorMessage.next('We already have a recipe with this name. Please, consider to change it');
    }
  }

  setRecipes(recipes: Recipe[], email?: string) {
    if (!email) {
      this.recipes = recipes;
      this.recipesListChanged.next(this.recipes.slice());
    }
    else {
      this.personalRecipes = recipes;
      this.personalRecipesListChanged.next(this.personalRecipes.slice())
    }
  }

  deletePersonalRecipe(index: number) {
    this.recipes.splice(this.recipes.findIndex(recipes => recipes.email === this.personalRecipes[index].email &&
      recipes.name === this.personalRecipes[index].name), 1);
    this.personalRecipes.splice(index, 1);
    this.personalRecipesListChanged.next(this.personalRecipes.slice());
    this.recipesListChanged.next(this.recipes.slice());
  }

  deleteIngredient(recipeIndex: number, ingredientIndex: number) {
    this.recipes[recipeIndex].ingredients.splice(ingredientIndex, 1);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
