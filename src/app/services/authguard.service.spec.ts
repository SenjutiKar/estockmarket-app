import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthguardService } from './authguard.service';
import { UserService } from './user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthguardService', () => {
  let service: AuthguardService;
  let userService: UserService;
  let client: HttpClient;
  let router: Router;
  let mockRouter = {
    navigateByUrl: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      providers: [UserService, HttpClient, AuthguardService,
        { provide: Router, useValue: mockRouter }]
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
