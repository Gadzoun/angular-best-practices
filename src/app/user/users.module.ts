import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "./register.component";
import { SignInComponent } from "./sign-in.component";

@NgModule({
    imports: [ 
        CommonModule,
        ReactiveFormsModule, 
        FormsModule,
        SharedModule,
        RouterModule
    ],
    declarations: [ RegisterComponent, SignInComponent ],
    exports: [ ],
    providers: [ ]
})
export class UsersModule { };