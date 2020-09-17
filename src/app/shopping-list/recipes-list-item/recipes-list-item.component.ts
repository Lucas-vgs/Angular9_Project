import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/recipe-book/models/recipe.model';

@Component({
  selector: 'app-recipes-list-item',
  templateUrl: './recipes-list-item.component.html',
  styleUrls: ['./recipes-list-item.component.css']
})
export class RecipesListItemComponent implements OnInit {
  @Input() element: Recipe;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
