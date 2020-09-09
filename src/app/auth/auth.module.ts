import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [AuthComponent],
    imports: [
        SharedModule,
        FormsModule,
        AuthRoutingModule,
        RouterModule
    ],
})
export class AuthModule { }