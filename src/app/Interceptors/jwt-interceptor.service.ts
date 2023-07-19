import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.userService.getuserTokenDetails()) {
      const userToken = this.userService.getuserTokenDetails().jwtToken;
      const isApiUrl = request.url.startsWith(environment.apiUrl);
      if (userToken && isApiUrl) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${userToken}`
          }
        });
      }
    }   
    return next.handle(request);
  }
}
