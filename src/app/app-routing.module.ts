import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { GroceryListComponent } from './components/grocery-list/grocery-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'grocery-list', pathMatch: 'full' },
  { path: 'grocery-list', component: GroceryListComponent},
  { path: 'create-product', component: CreateProductComponent},
  { path: 'edit-product/:id', component: CreateProductComponent},
  { path: '**', redirectTo: 'grocery-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
