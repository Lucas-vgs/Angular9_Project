import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeBookService } from '../recipe-book.service';
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
    private service: RecipeBookService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.service.recipesListChanged.subscribe(
      (rec: Recipe[]) => { this.recipes = rec }
    );
    this.recipes = this.service.getRecipes();
  }

  toNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
