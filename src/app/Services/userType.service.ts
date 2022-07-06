import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { UserType } from '../models/userType';
import { SERVICE_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  constructor(private http: HttpClient) { }

  private readonly headers:HttpHeaders=new HttpHeaders({'Authorization':"Bearer "+localStorage.getItem("jwt")});


  public getUserTypes(): Observable<UserType[]> {

    let retval$ = new Subject<UserType[]>();

    this.http.get<UserType[]>(`${SERVICE_URL}/userTypes`,{headers:this.headers}).subscribe((userTypes: UserType[]) => {

      retval$.next(userTypes)

    });

    return retval$.asObservable();
  }

  public createUserType(userType: UserType): Observable<UserType> {

    let retval$ = new Subject<UserType>();
    this.http.post<UserType>(`${SERVICE_URL}/userTypes`, userType,{headers:this.headers}).subscribe((helper: UserType) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }



 
  public deleteUserType(userType: UserType): Observable<UserType> {


    let retval$ = new Subject<UserType>();
    this.http.delete<UserType>(`${SERVICE_URL}/userTypes/${userType.UserTypeId}`,{headers:this.headers}).subscribe((helper: UserType) => {
      retval$.next(helper)
    })


    return retval$.asObservable();
  }

  public editUserType(userType: UserType): Observable<UserType> {

    let retval$ = new Subject<UserType>();

    this.http.put<UserType>(`${SERVICE_URL}/userTypes`, userType,{headers:this.headers}).subscribe((helper: UserType) => {

      retval$.next(helper)

    });

    return retval$.asObservable();


  }

  public getOneUserType(userType: UserType): Observable<UserType> {

    let retval$ = new Subject<UserType>();

    this.http.get<UserType>(`${SERVICE_URL}/userTypes/${userType.UserTypeId}`,{headers:this.headers}).subscribe((helper: UserType) => {
      retval$.next(helper)

    });

    return retval$.asObservable();

  }

}
