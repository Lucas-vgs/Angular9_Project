import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeBookService } from '../../shared/Services/recipe-book.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { DataStorageService } from 'src/app/shared/Services/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('50ms', [animate('0.1s ease-in', keyframes([
          style({ opacity: 0, transform: 'translateY(-75px)', offset: 0 }),
          style({ opacity: 0.5, transform: 'translateY(35px)', offset: 0.1 }),
          style({ opacity: 1, transform: 'translateY(0px)', offset: 1 }),
        ]))]), {optional:true})
      ])
    ])
  ]
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeBookService,
    private dataService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id']; // id é a mesma propriedade setada no app-routing. Na Child
        this.recipe = this.recipeService.getPersonalRecipeById(this.id)
      }
    )
  }

  toEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.recipeService.deletePersonalRecipe(this.id);
    this.router.navigate(['recipes']);
    this.dataService.storeRecipes();
  }

}
