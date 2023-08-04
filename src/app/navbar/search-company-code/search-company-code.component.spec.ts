import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyService } from 'src/app/services/company.service';

import { SearchCompanyCodeComponent } from './search-company-code.component';

describe('SearchCompanyCodeComponent', () => {
  let component: SearchCompanyCodeComponent;
  let fixture: ComponentFixture<SearchCompanyCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchCompanyCodeComponent],
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [CompanyService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCompanyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
