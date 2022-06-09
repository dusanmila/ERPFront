import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthorisationService } from 'src/app/Services/authorisation.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: {username:string, password:string} = {username:"", password:""};

  isLoginFailed: boolean = false;


  constructor(private router: Router, public authorisation: AuthorisationService, private http: HttpClient) { }

  ngOnInit(): void {
  }


  public LoginUser(){
    this.http.post("https://localhost:44323/api/auths/login", this.user, {headers: {}}).subscribe((data: any) => {
      console.log(data);

      const helper = new JwtHelperService();

        if (data.token !== undefined)
        {


          const token = data.token;
          const refreshToken = data.refreshToken;
          localStorage.setItem("jwt", token);
          localStorage.setItem("refreshToken", refreshToken);
       //   let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
     //  const decodedToken = helper.decodeToken(token);

    const role=JSON.parse(window.atob(token.split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

if(role=="Admin"){
  this.router.navigate(["/admin"]);
}

          this.router.navigate(["/storeCheck"]);
        }
    });
  }
}
