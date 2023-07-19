import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthguardService } from './authguard.service';
import { UserService } from './user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

describe('AuthguardService', () => {
  let service: AuthguardService;
  let userService: UserService;
  let client: HttpClient;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [UserService, HttpClient, Router]
    });
    service = TestBed.inject(AuthguardService);
    userService = TestBed.inject(UserService);
    client = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
