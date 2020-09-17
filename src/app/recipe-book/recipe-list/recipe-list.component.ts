import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeBookService } from '../../shared/Services/recipe-book.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  sub: Subscription;

  constructor(
    private recipeService: RecipeBookService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.recipeService.personalRecipesListChanged.subscribe(
      (rec: Recipe[]) => { this.recipes = rec }
    );
    this.recipes = this.recipeService.getRecipes(this.recipeService.email);
  }

  toNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
