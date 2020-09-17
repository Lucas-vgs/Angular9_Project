import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./Directives/dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { FilterPipe } from './Pipe/filter.pipe';

@NgModule({
    declarations: [
        AlertComponent,
        DropdownDirective,
        LoadingSpinnerComponent,
        FilterPipe,
    ],
    imports: [CommonModule],
    exports: [
        AlertComponent,
        DropdownDirective,
        LoadingSpinnerComponent,
        CommonModule,
        FilterPipe
    ],
})
export class SharedModule { }