import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { StockDetails } from '../models/StockDetails';
import { StockService } from '../services/stock.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit, OnDestroy {

  constructor(private companyService: CompanyService, private stockService: StockService) { }

  companyCodes: string[] = [];
  model: any;
  code: any;
  price: any;
  stockDetails = new StockDetails();
  displayAlert = false;
  loading = false;

  ngOnInit(): void {
    document.body.classList.add('bg-stock-img');
    this.companyService.getCompanyCodeList.subscribe(companyCodeList => {
      this.companyCodes = companyCodeList.sort();
    });
  }

  onAddStock(form: NgForm) {
    this.loading = true;
    this.stockDetails.companyCode = this.code;
    this.stockDetails.price = this.price;
    this.stockService.addStock(this.stockDetails).subscribe(response => {
      if (response > 0) {
        form.reset();
        this.loading = false;
        this.displayAlert = true;
        setTimeout(() => {
          this.displayAlert = false;
        }, 10000);
      }
    });
  }

  closeAlert() {
    this.displayAlert = false;
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-stock-img');
  }

}
