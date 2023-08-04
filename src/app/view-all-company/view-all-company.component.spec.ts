import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyResponse } from '../models/CompanyResponse';
import { CompanyService } from '../services/company.service';

import { ViewAllCompanyComponent } from './view-all-company.component';

describe('ViewAllCompanyComponent', () => {
  let component: ViewAllCompanyComponent;
  let fixture: ComponentFixture<ViewAllCompanyComponent>;
  let companyService: CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllCompanyComponent],
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [CompanyService, HttpClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    companyService = TestBed.inject(CompanyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit()', () => {
    const companyResponse: CompanyResponse[] = [
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
      },
      {
        id: '102',
        code: 'Comp002',
        ceo: 'xyz',
        name: 'XYZ Pvt. Ltd.',
        turnover: 200000000,
        url: 'xyz.com',
        stockExchange: ['BSE', 'NSE'],
        price: 890.00,
        date: '08/02/2023',
        time: '12:00'
      }
    ];
    spyOn(companyService, 'setAllCompanyDetails');
    companyService.companyDetails.next(companyResponse);
    component.ngOnInit();
    expect(component.companies.length).toEqual(2);
    expect(companyService.setAllCompanyDetails).toHaveBeenCalled();
    expect(component.isCompanyPresent).toBeTrue();
  });
});
