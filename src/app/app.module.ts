import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }  from './app.component';
import { NavBarComponent }  from './nav-bar.component';
import { DataRepositoryService } from "./services/data-repository.service";
import { AccountMenuComponent } from "./account-menu.component";
import { CatalogModule } from './catalog/catalog.module';
import { UsersModule } from './user/users.module';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CatalogModule,
    BrowserModule,
    UsersModule
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    AccountMenuComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
