import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { Token } from '../models/Token';
import { JwtHelperService } from '@auth0/angular-jwt'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  userToken = new BehaviorSubject(JSON.parse(localStorage.getItem('jwtToken')!));

  constructor(private httpClient: HttpClient,
    private router: Router, private jwtHelper: JwtHelperService) { }
  
  getUserToken = this.userToken.asObservable();

  login(usersdata: User) {
    return this.httpClient.post<any>(this.baseUrl + 'userauth/authenticate', usersdata, this.headers)
      .pipe(map(response => {
        const userToken = response;
        localStorage.setItem('jwtToken', userToken);
        localStorage.setItem('username', usersdata.username);
        this.userToken.next(userToken);
        return userToken;
      }));
  }

  isUserAuthenticated() {
    const token = this.getuserTokenDetails();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  getuserTokenDetails() {
    return this.userToken.value;
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    this.userToken.next(null);
    this.router.navigateByUrl('/login');
  }

}
