import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomerFormComponent } from './pages/customer-form/customer-form.component';

const routes: Routes = [
  {path: 'customers', component: CustomersComponent},
  {path: 'customers/create', component: CustomerFormComponent},
  {path: 'customers/update/:documentNumber', component: CustomerFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
