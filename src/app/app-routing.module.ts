import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { RegisterComponent } from './user/register.component';
import { SignInComponent } from './user/sign-in.component';
import { NgModule } from '@angular/core';

export const routes : Routes = [
  { path: 'catalog', component: CatalogComponent, },
  { path: 'users/register', component: RegisterComponent, },
  { path: 'users/sign-in', component: SignInComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
