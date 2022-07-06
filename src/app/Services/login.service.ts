import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {SERVICE_URL } from '../app.constants';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private readonly headers:HttpHeaders=new HttpHeaders({'Authorization':"Bearer "+localStorage.getItem("jwt")});

  public login(username: string, password: string): Observable<any> {
    let retval$ = new Subject<any>();
    console.log("aa");
    this.http.post<any>(`${SERVICE_URL}/authenticate`, {username: username, password: password},{headers:this.headers}).subscribe({
      next: data => {
        console.log("bb");
        retval$.next(data);
      },
      error: e => {
        retval$.error(e);
      }
    });
    return retval$.asObservable();
  }
}
