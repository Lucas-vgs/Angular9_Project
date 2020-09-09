import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { CommonModule } from "@angular/common";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";



@NgModule({
    declarations: [ShoppingListComponent, ShoppingListEditComponent],
    imports: [
        ShoppingListRoutingModule,
        FormsModule,
       // CommonModule, O shared Module já exporta um CommonModule
        RouterModule,
        SharedModule
    ]
})


export class ShoppingListModule { }