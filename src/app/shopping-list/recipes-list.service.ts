import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesListService {

  editing = new Subject<number>();
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [

  ];


  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  setIngredients(el: Ingredient) {
    this.ingredients.push(el);
    this.ingredientsChanged.next(this.ingredients.slice());

  }

  updateIngredient(index: number, el: Ingredient) {
    this.ingredients[index] = el;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredientsArray(el: Ingredient[]) {
    this.ingredients.push(...el);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
