import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { Token } from '../models/Token';

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
  userToken = new BehaviorSubject(localStorage.getItem('jwtToken'));

  constructor(private httpClient: HttpClient,
    private router: Router) { }
  
  getUserToken = this.userToken.asObservable();

  login(usersdata: User) {
    return this.httpClient.post<any>(this.baseUrl + 'userauth/authenticate', usersdata, this.headers)
      .pipe(map(response => {
        const userToken = response;
        localStorage.setItem('jwtToken', userToken.jwtToken);
        localStorage.setItem('username', usersdata.username);
        this.userToken.next(userToken.jwtToken);
        return userToken;
      }));
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
