import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCompanyCodeComponent } from './search-company-code.component';

describe('SearchCompanyCodeComponent', () => {
  let component: SearchCompanyCodeComponent;
  let fixture: ComponentFixture<SearchCompanyCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCompanyCodeComponent ]
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
