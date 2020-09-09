import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;
  sub: Subscription;
  editIndex: number;
  editMode = false;
  editedIngredient: Ingredient;

  constructor(private service: ShoppingListService) { }

  ngOnInit(): void {
    this.sub = this.service.editing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedIngredient = this.service.getIngredient(index);
        this.form.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        }),
          this.editIndex = index;
      }
    )

  }

  addClicked(f: NgForm) {
    const value = f.value;
    let ing = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.service.updateIngredient(this.editIndex, ing);
    }
    else {
      this.service.setIngredients(ing);
    }
    this.onClear();
  }


  onDelete() {
    this.onClear();
    this.service.deleteIngredient(this.editIndex);
  }

  onClear() {
    this.editMode = false;
    this.form.reset();
  }

  onSubmit() { }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
