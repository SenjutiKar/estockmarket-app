import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { ViewAllCompanyComponent } from './view-all-company/view-all-company.component';
import { ViewCompanyComponent } from './view-company/view-company.component';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './services/authguard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'view-all-companies', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'add-company', component: AddCompanyComponent, canActivate: [AuthguardService] },
  { path: 'view-all-companies', component: ViewAllCompanyComponent, canActivate: [AuthguardService] },
  { path: 'view-company/:code', component: ViewCompanyComponent, canActivate: [AuthguardService] },
  { path: 'add-stock', component: AddStockComponent, canActivate: [AuthguardService] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
