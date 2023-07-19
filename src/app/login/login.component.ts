import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  loading = false;
  public isUnauthorized = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.isUnauthorized = false;
    const user = new User();
    user.username = this.username;
    user.password = this.password;
    this.userService.login(user)
      .pipe(first()).subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        error: error => {
          this.loading = false;
          this.checkUnauthorized(error);
        }
      });
  }

  checkUnauthorized(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.isUnauthorized = true;
    } else {
      this.isUnauthorized = false;
    }
  }

}
