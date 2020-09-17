import { NgModule } from "@angular/core";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeBookComponent } from "./recipe-book.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipeRoutingModule } from "./recipe-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        RecipeBookComponent,

    ],
    imports: [
        RouterModule,
        // CommonModule, O shared Module já exporta um CommonModule
        ReactiveFormsModule,
        RecipeRoutingModule,
        SharedModule],
    // exports: [
    //     RecipeListComponent,
    //     RecipeItemComponent,
    //     RecipeDetailComponent,
    //     RecipeStartComponent,
    //     RecipeEditComponent,
    //     RecipeBookComponent,
    // ]
})
export class RecipeModule { }