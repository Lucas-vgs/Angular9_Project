import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { RecipeBookService } from '../../shared/Services/recipe-book.service';
import { Recipe } from '../models/recipe.model';
import { DataStorageService } from 'src/app/shared/Services/data-storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  isPublicRecipe: boolean; // Defines whether your Recipe is public or private.
  id: number; // the ID gotten through the URL.
  editMode = false; // check if we are editing or creating a new recipe.
  formRecipe: FormGroup;
  error: string = null;
  units = [
    'Units',
    'Grams',
    'Mililiters',
  ]


  constructor(
    private route: ActivatedRoute,
    private service: RecipeBookService,
    private dataService: DataStorageService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
    this.service.errorMessage.subscribe(message => { this.error = message })
  }

  onClickToggle() {
    this.isPublicRecipe = !this.isPublicRecipe
  }
  private initForm() {
    let name = '';
    let path = '';
    let description = '';
    let ingredients = new FormArray([]);
    let isPublic = false;

    if (this.editMode) {
      const recipe = this.service.getPersonalRecipeById(this.id)
      this.isPublicRecipe = recipe.isPublic;
      name = recipe.name;
      path = recipe.imagePath;
      description = recipe.description;
      isPublic = recipe.isPublic;
      for (let ing of recipe.ingredients) {
        ingredients.push(new FormGroup({
          name: new FormControl(ing.name, [Validators.required]),
          amount: new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          unit: new FormControl(ing.unit, [Validators.required]),
        }))
      };
    }

    this.formRecipe = this.fb.group({
      'name': new FormControl(name, [Validators.required]),
      'imagePath': new FormControl(path, [Validators.required]),
      'description': new FormControl(description, [Validators.required]),
      'ingredients': ingredients,
      'isPublic': new FormControl(isPublic)
    })
  }

  get ingredientsArray() {
    return (<FormArray>this.formRecipe.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.formRecipe.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'unit': new FormControl(null, [Validators.required])
    }))
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.formRecipe.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    let rec = new Recipe(this.formRecipe.value['name'], this.formRecipe.value['description'],
      this.formRecipe.value['imagePath'], this.formRecipe.value['ingredients'], this.service.email,
      this.formRecipe.value['isPublic']);
    if (this.editMode) {
      this.service.updateRecipe(this.id, rec); // one way to pass data
      this.dataService.storeRecipes();
    }
    else {
      this.service.addRecipe(rec); // another way
      this.dataService.storeRecipes();
    }
  }

  onCancel() {
    this.service.onCancel();
  }

  handleError() {
    this.error = null;
  }

}
