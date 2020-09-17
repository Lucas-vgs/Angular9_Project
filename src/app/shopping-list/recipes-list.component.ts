import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe-book/models/recipe.model';
import { RecipeBookService } from '../shared/Services/recipe-book.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  sub: Subscription;
  filteredStatus="";

  constructor(
    private recipeService: RecipeBookService,

  ) { }


  ngOnInit() {
    this.sub = this.recipeService.recipesListChanged.subscribe(
      (rec: Recipe[]) => { this.recipes = rec }
    );
    this.recipes = this.recipeService.getRecipes();
  }



  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
