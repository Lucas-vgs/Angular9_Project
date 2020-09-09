import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeBookService } from '../recipe-book.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(
    private service: RecipeBookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id']; // id é a mesma propriedade setada no app-routing. Na Child
        this.recipe = this.service.getRecipeById(this.id)
      }
    )
  }

  sendIngredients() {
    this.service.sendIngredients(this.recipe.ingredients);
  }

  toEdit() {
    this.router.navigate( ['edit'], { relativeTo: this.route });
  }

  onDelete(){
    this.service.deleteRecipe(this.id);
    this.router.navigate(['recipes'])
  }

}
