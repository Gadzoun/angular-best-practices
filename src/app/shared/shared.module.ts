import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner.component";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ LoadingSpinnerComponent ],
    exports: [ LoadingSpinnerComponent, CommonModule ],
    providers: []
})
export class SharedModule { };