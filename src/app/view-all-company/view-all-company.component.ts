import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { CompanyResponse } from '../models/CompanyResponse';

@Component({
  selector: 'app-view-all-company',
  templateUrl: './view-all-company.component.html',
  styleUrls: ['./view-all-company.component.css']
})
export class ViewAllCompanyComponent implements OnInit {

  isCompanyPresent: boolean = true;
  companies = new Array<CompanyResponse>();

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.setAllCompanyDetails();
    this.companyService.getCompanyDetails.subscribe(companyResponse => {
      if (companyResponse !== undefined && companyResponse.length > 0) {
        this.companies = companyResponse;
      }
      this.isCompanyPresent = this.companies.length > 0;
    });
  }

}
