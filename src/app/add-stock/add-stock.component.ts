import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { StockDetails } from '../models/StockDetails';
import { StockService } from '../services/stock.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  constructor(private companyService: CompanyService, private stockService: StockService) { }

  companyCodes: string[] = [];
  model: any;
  code = 'Choose...';
  price: any;
  stockDetails = new StockDetails();
  displayAlert = false;

  ngOnInit(): void {
    this.companyService.getCompanyCodeList.subscribe(companyCodeList => {
      this.companyCodes = companyCodeList;
    });
  }

  onAddStock(form: NgForm) {
    this.stockDetails.companyCode = this.code;
    this.stockDetails.price = this.price;
    this.stockService.addStock(this.stockDetails).subscribe(response => {
      if (response > 0) {
        form.reset();
        this.code = 'Choose...';
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

}
