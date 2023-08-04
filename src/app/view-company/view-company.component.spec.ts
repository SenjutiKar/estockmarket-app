import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { CompanyResponse } from '../models/CompanyResponse';
import { StockDetailsResponse } from '../models/StockDetailsResponse';
import { StockPriceDetails } from '../models/stockPriceDetails';
import { CompanyService } from '../services/company.service';
import { StockService } from '../services/stock.service';

import { ViewCompanyComponent } from './view-company.component';

describe('ViewCompanyComponent', () => {
  let component: ViewCompanyComponent;
  let fixture: ComponentFixture<ViewCompanyComponent>;
  let fakeActivatedRoute = {
    params: of({code: 'Comp001'})
  }
  let activatedRoute: ActivatedRoute;
  let companyService: CompanyService;
  let stockService: StockService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCompanyComponent],
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      providers: [CompanyService, HttpClient, StockService, 
        { provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    activatedRoute = TestBed.inject(ActivatedRoute);
    companyService = TestBed.inject(CompanyService);
    stockService = TestBed.inject(StockService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit()', () => {
    const companyResponse: CompanyResponse =
    {
      id: '101',
      code: 'Comp001',
      ceo: 'abc',
      name: 'ABC Pvt. Ltd.',
      turnover: 100000000,
      url: 'abc.com',
      stockExchange: ['BSE', 'NSE'],
      price: 1200.00,
      date: '08/02/2023',
      time: '12:00'
    };
    companyService.company.next(companyResponse);
    component.ngOnInit();
    expect(component.isValidCompanyCode).toBeTrue();
    expect(component.isStockDetailsPresent).toBeFalse();
  });

  it('should test invalidDateRange() when startdate > enddate', () => {
    component.startDate = new Date(2023, 8, 4);
    component.endDate = new Date(2023, 8, 3);
    const result = component.invalidDateRange();
    expect(result).toBeTrue();
  });

  it('should test invalidDateRange() when startdate < enddate', () => {
    component.endDate = new Date(2023, 8, 4);
    component.startDate = new Date(2023, 8, 3);
    const result = component.invalidDateRange();
    expect(result).toBeFalse();
  });

  it('should test onSubmit()', () => {
    const stockPriceDetails: StockPriceDetails = {
      code: 'Comp001',
      price: 1200.00,
      date: '08/02/2023',
      time: '12:00'
    };
    const stockDetailsResponse: StockDetailsResponse = {
      stockPrices: [stockPriceDetails],
      minPrice: 1200.00,
      maxPrice: 1200.00,
      averagePrice: 1200.00
    };
    spyOn(stockService, 'getStockDetailsByDate').and.returnValue(of(stockDetailsResponse));
    component.onSubmit();
    expect(stockService.getStockDetailsByDate).toHaveBeenCalled();
    expect(component.maxPrice).toEqual(1200.00);
    expect(component.minPrice).toEqual(1200.00);
    expect(component.avgPrice).toEqual(1200.00);
    expect(component.isStockDetailsPresent).toBeTrue();
  });

  it('should test onsubmit() when response', () => {
    const stockDetailsResponse: StockDetailsResponse = {
      stockPrices: [],
      minPrice: 0.00,
      maxPrice: 0.00,
      averagePrice: 0.00
    };
    spyOn(stockService, 'getStockDetailsByDate').and.returnValue(of(stockDetailsResponse));
    component.onSubmit();
    expect(stockService.getStockDetailsByDate).toHaveBeenCalled();
    expect(component.isStockDetailsPresent).toBeFalse();
  });
});
