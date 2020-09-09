import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  editing = new Subject<number>();
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
    new Ingredient('Oranges', 2)
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
