import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { SearchCompanyCodeComponent } from './search-company-code/search-company-code.component';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [NavBarComponent, SearchCompanyCodeComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbTypeaheadModule
  ],
  exports:[NavBarComponent, SearchCompanyCodeComponent]
})
export class NavbarModule { }
