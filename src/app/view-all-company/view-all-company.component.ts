import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { CompanyResponse } from '../models/CompanyResponse';

@Component({
  selector: 'app-view-all-company',
  templateUrl: './view-all-company.component.html',
  styleUrls: ['./view-all-company.component.css']
})
export class ViewAllCompanyComponent implements OnInit, OnDestroy {

  isCompanyPresent: boolean = true;
  companies = new Array<CompanyResponse>();

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    document.body.classList.add('bg-img')
    this.companyService.setAllCompanyDetails();
    this.companyService.getCompanyDetails.subscribe(companyResponse => {
      if (companyResponse !== undefined && companyResponse.length > 0) {
        this.companies = companyResponse.sort((a, b) => a.code.localeCompare(b.code));
      }
      this.isCompanyPresent = this.companies.length > 0;
    });
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-img');
  }
}
