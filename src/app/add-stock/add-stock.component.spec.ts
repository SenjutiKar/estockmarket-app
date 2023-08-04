import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyService } from '../services/company.service';
import { FormsModule, NgForm, Validators } from '@angular/forms';
import { AddStockComponent } from './add-stock.component';
import { StockService } from '../services/stock.service';
import { of } from 'rxjs';

describe('AddStockComponent', () => {
  let component: AddStockComponent;
  let fixture: ComponentFixture<AddStockComponent>;
  let stockService: StockService;
  let companyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddStockComponent],
      imports: [HttpClientTestingModule, HttpClientModule, FormsModule],
      providers: [CompanyService, HttpClient, StockService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    stockService = TestBed.inject(StockService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test closeAlert()', () => {
    component.displayAlert = true;
    component.closeAlert();
    expect(component.displayAlert).toBeFalse();
  });

  it('should test onAddStock()', () => {
    component.stockDetails.companyCode = 'Comp001';
    component.stockDetails.price = 1200.99;
    let form = new NgForm(Array<any>(), Array<any>());
    spyOn(stockService, 'addStock').and.returnValue(of(1));
    component.onAddStock(form);
    expect(stockService.addStock).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
  });
});
