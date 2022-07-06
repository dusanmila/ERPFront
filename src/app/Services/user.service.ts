
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { SERVICE_URL } from '../app.constants';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private readonly headers:HttpHeaders=new HttpHeaders({'token':""+localStorage.getItem("jwt")});


  public getUsers(): Observable<User[]> {

    let retval$ = new Subject<User[]>();

    this.http.get<User[]>(`${SERVICE_URL}/users`,{headers:this.headers}).subscribe((users: User[]) => {

      retval$.next(users)

    });

    return retval$.asObservable();
  }

  public createUser(user: User): Observable<User> {

    let retval$ = new Subject<User>();
    this.http.post<User>(`${SERVICE_URL}/users`, user,{headers:this.headers}).subscribe((helper: User) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }



 
  public deleteUser(username: string): Observable<User> {


    let retval$ = new Subject<User>();
    this.http.delete<User>(`${SERVICE_URL}/users/${username}`,{headers:this.headers}).subscribe((helper: User) => {
      retval$.next(helper)
    })


    return retval$.asObservable();
  }

  public editUser(user: User): Observable<User> {

    let retval$ = new Subject<User>();

    this.http.put<User>(`${SERVICE_URL}/users/edit/${user.username}`, user,{headers:this.headers}).subscribe((helper: User) => {

      retval$.next(helper)

    });

    return retval$.asObservable();


  }

  public getOneUser(user: User): Observable<User> {

    let retval$ = new Subject<User>();

    this.http.get<User>(`${SERVICE_URL}/users/${user.userId}`,{headers:this.headers}).subscribe((helper: User) => {
      retval$.next(helper)

    });

    return retval$.asObservable();

  }





}
