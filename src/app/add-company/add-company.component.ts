import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Company } from '../models/Company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  compCode: any;
  compName: any;
  compCeo: any;
  compTurnover: any;
  compWebsite = '';
  stockExchange: string[] = [];
  companyCodes: string[] = [];
  company = new Company();
  displayAlert = false;
  code = '';

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompanyCodeList.subscribe(companyCodeList => {
      if (companyCodeList.length > 0) {
        this.companyCodes = companyCodeList;
      }
    })
  }

  onAddCompany(companyForm: NgForm) {
    this.company.code = this.compCode;
    this.company.name = this.compName;
    this.company.ceo = this.compCeo;
    this.company.turnover = this.compTurnover;
    this.company.url = this.compWebsite;
    this.company.stockExchange = this.stockExchange;

    this.companyService.registerCompany(this.company).subscribe(response => {
      if (response !== undefined && response !== null && response.code === this.compCode) {
        companyForm.reset();
        // this.compTurnover = 100000000;
        this.code = response.code;
        this.displayAlert = true;
        this.companyService.setCompanyCodeList();
        setTimeout(() => {
          this.displayAlert = false;
        }, 10000);
      }
    });
  }

  checkExistingCompanyCode(): boolean{
    if (this.companyCodes.includes(this.compCode)) {
      return true;
    }
    return false;
  }

  isInvalidTurnover(): boolean{
    return this.compTurnover < 100000000;
  }

  closeAlert() {
    this.displayAlert = false;
  }
}
