import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { CompanyResponse } from '../models/CompanyResponse';
import { StockService } from '../services/stock.service';
import { StockPriceDetails } from '../models/stockPriceDetails';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit, OnDestroy {

  isValidCompanyCode: boolean = true;
  companyCode: string = '';
  company = new CompanyResponse();
  startDate = new Date();
  endDate = new Date();
  isStockDetailsPresent = false;
  stockPriceDetails = Array<StockPriceDetails>();
  maxPrice = 0;
  minPrice = 0;
  avgPrice = 0;

  constructor(private companyService: CompanyService, private activatedRoute: ActivatedRoute,
  private stockService: StockService) { }

  ngOnInit(): void {
    document.body.classList.add('bg-img');
    this.activatedRoute.params.subscribe(params => {
      this.companyCode = params['code'];
    });
    this.companyService.getCompany.subscribe(data => {
      if (data !== null && data !== undefined && data.id !== null && data.id !== '') {
        this.company = data;
        this.isValidCompanyCode = true;
        this.isStockDetailsPresent = false;
        this.startDate = new Date();
        this.endDate = new Date();
      } else {
        this.isValidCompanyCode = false;
      }
    });
  }

  onSubmit() {
    this.stockService.getStockDetailsByDate(this.companyCode, this.startDate, this.endDate)
      .subscribe(response => {
        if (response !== undefined && response !== null && response.stockPrices.length > 0) {
          this.stockPriceDetails = response.stockPrices.slice();
          this.maxPrice = response.maxPrice;
          this.minPrice = response.minPrice;
          this.avgPrice = response.averagePrice;

          this.isStockDetailsPresent = true;
        } else {
          this.isStockDetailsPresent = false;
        }
      });
  }

  public invalidDateRange(): boolean {
    if (this.startDate !== undefined && this.endDate !== undefined &&
      this.startDate > this.endDate) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-img');
  }

}
