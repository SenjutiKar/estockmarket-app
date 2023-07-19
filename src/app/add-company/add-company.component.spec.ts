import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyService } from '../services/company.service';
import { AddCompanyComponent } from './add-company.component';

describe('AddCompanyComponent', () => {
  let component: AddCompanyComponent;
  let fixture: ComponentFixture<AddCompanyComponent>;
  let companyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCompanyComponent],
      providers: [CompanyService]
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
});
