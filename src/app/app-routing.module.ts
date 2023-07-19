import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { HomeComponent } from './home/home.component';
import { ViewAllCompanyComponent } from './view-all-company/view-all-company.component';
import { ViewCompanyComponent } from './view-company/view-company.component';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthguardService] },
  { path: 'company', component: AddCompanyComponent, canActivate: [AuthguardService] },
  { path: 'allcompanies', component: ViewAllCompanyComponent, canActivate: [AuthguardService] },
  { path: 'companycode/:code', component: ViewCompanyComponent, canActivate: [AuthguardService] },
  { path: 'stock', component: AddStockComponent, canActivate: [AuthguardService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
