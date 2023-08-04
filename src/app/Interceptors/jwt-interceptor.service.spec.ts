import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from '../services/user.service';

import { JwtInterceptor } from './jwt-interceptor.service';

describe('JwtInterceptorService', () => {
  let service: JwtInterceptor;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [UserService, JwtInterceptor]
    });
    service = TestBed.inject(JwtInterceptor);
  }); 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
