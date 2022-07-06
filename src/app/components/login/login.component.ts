import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { SERVICE_URL } from 'src/app/app.constants';
import { LoginService } from 'src/app/Services/login.service';
//import { stringify } from 'querystring';
//import { clearScreenDown } from 'readline';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: { username: string, password: string } = { username: "", password: "" };

  isLoginFailed: boolean = false;
  isLoading = false;


  constructor(private router: Router, public loginService: LoginService) { }

  ngOnInit(): void {
  }

  public LoginUser() {

    this.isLoading = true;

    if (this.isLoginFailed != false) {
      this.isLoginFailed = false;
    }

    this.loginService.login(this.user.username, this.user.password).subscribe({
      next: data => {
        console.log(data.status);

        if (data.token !== null) {
          const token = data.token;
        
          localStorage.setItem("jwt", token);

      
            this.router.navigate(["/admin"]);
          
        }
      },
      error: (e) => {
        if (e.status == 401) {
          this.isLoading = false;
          this.isLoginFailed = true;
        }
      }
    });

  }
}
