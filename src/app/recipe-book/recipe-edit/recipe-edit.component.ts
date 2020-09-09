import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeBookService } from '../recipe-book.service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false; // checa se está em edição ou criando um novo componente.
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeBookService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm() {
    let name = '';
    let path = '';
    let description = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.service.getRecipeById(this.id)
      name = recipe.name;
      path = recipe.imagePath;
      description = recipe.description;

      for (let ing of recipe.ingredients) {
        ingredients.push(new FormGroup({
          'name': new FormControl(ing.name, [Validators.required]),
          'amount': new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }))
      }

    }

    this.form = new FormGroup({
      'name': new FormControl(name, [Validators.required]),
      'imagePath': new FormControl(path, [Validators.required]),
      'description': new FormControl(description, [Validators.required]),
      'ingredients': ingredients
    })

  }

  get ingredientsArray() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.form.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    let rec = new Recipe(this.form.value['name'], this.form.value['description'],
      this.form.value['imagePath'], this.form.value['ingredients']);

    if (this.editMode) {
      this.service.updateRecipe(this.id, rec); // one way to pass data
      this.router.navigate(['recipes']);
    }
    else {
      this.service.addRecipe(this.form.value) // another way
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
