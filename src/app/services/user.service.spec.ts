import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserService', () => {
  let service: UserService;
  let client: HttpClient;
  //let router: Router;
  let jwtHelper: JwtHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      providers:[HttpClient, UserService, JwtHelperService]
    });
    service = TestBed.inject(UserService);
    client = TestBed.inject(HttpClient);
    //router = TestBed.inject(Router);
    jwtHelper = TestBed.inject(JwtHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
