import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('UserService', () => {
  let client: HttpClient;
  let router: any;
  let service: any;
  let mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      providers: [HttpClient, UserService,
        { provide: Router, useValue: mockRouter }]
    });
    service = TestBed.inject(UserService);
    client = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test logout method', () => {
    spyOn(localStorage, 'removeItem');
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should test getuserTokenDetails method', () => {
    let result = service.getuserTokenDetails();
    expect(result).toBeNull();
    service.userToken.next('testToken');
    result = service.getuserTokenDetails();
    expect(result).toEqual('testToken');
  })
});
