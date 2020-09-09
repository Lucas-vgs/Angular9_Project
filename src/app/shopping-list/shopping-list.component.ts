import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  subs: Subscription;
  ingredients: Ingredient[];
  constructor(
    private service: ShoppingListService,
  ) { }


  ngOnInit() {
    this.ingredients = this.service.getIngredients();
    this.subs = this.service.ingredientsChanged.subscribe(
      (ing: Ingredient[]) => this.ingredients = ing
    );
  }

  toEdit(index: number) {
    this.service.editing.next(index);
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
