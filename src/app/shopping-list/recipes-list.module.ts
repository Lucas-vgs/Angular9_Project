import { RecipesListComponent } from "./recipes-list.component";
import { RecipesListEditComponent } from "./recipes-list-edit/recipes-list-edit.component";
import { RecipesListRoutingModule } from "./recipes-list-routing.module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RecipesListItemComponent } from './recipes-list-item/recipes-list-item.component';



@NgModule({
    declarations: [RecipesListComponent, RecipesListEditComponent, RecipesListItemComponent],
    imports: [
        RecipesListRoutingModule,
        FormsModule,
       // CommonModule, O shared Module já exporta um CommonModule
        RouterModule,
        SharedModule
    ]
})


export class RecipesListModule { }