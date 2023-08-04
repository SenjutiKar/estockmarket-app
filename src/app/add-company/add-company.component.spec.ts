import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { CompanyService } from '../services/company.service';
import { AddCompanyComponent } from './add-company.component';

describe('AddCompanyComponent', () => {
  let component: AddCompanyComponent;
  let fixture: ComponentFixture<AddCompanyComponent>;
  let companyService: CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCompanyComponent],
      imports: [HttpClientTestingModule, HttpClientModule, FormsModule],
      providers: [CompanyService, HttpClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompanyComponent);
    companyService = TestBed.inject(CompanyService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit()', () => {
    const companyCodeList = ['Comp001', 'Comp002'];
    companyService.companyCodes.next(companyCodeList);
    component.ngOnInit();
    expect(component.companyCodes.length).toEqual(2);
  });

  it('should test closeAlert()', () => {
    component.displayAlert = true;
    component.closeAlert();
    expect(component.displayAlert).toBeFalse();
  });

  it('should test checkExistingCompanyCode() when existing company code', () => {
    component.companyCodes = ['Comp001', 'Comp002'];
    component.compCode = 'Comp002';
    const result = component.checkExistingCompanyCode();
    expect(result).toBeTrue();
  });

  it('should test checkExistingCompanyCode() when not existing company code', () => {
    component.companyCodes = ['Comp001', 'Comp002'];
    component.compCode = 'Comp003';
    const result = component.checkExistingCompanyCode();
    expect(result).toBeFalse();
  });

  it('should test onAddCompany()', () => {
    component.company = {
      id: null,
      code: 'Comp001',
      ceo: 'abc',
      name: 'ABC Pvt. Ltd.',
      turnover: 100000000,
      url: 'abc.com',
      stockExchange: ['BSE', 'NSE']
    };
    let form = new NgForm(Array<any>(), Array<any>());
    spyOn(companyService, 'registerCompany').and.returnValue(of(component.company));
    component.onAddCompany(form);
    expect(companyService.registerCompany).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
  });
});
