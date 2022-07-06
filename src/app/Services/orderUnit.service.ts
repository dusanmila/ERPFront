import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SERVICE_URL } from '../app.constants';
import { OrderUnit } from '../models/orderUnit';

@Injectable({
  providedIn: 'root'
})
export class OrderUnitService {

  constructor(private http: HttpClient) { }

  private readonly headers:HttpHeaders=new HttpHeaders({'Authorization':"Bearer "+localStorage.getItem("jwt")});


  public getOrderUnits(): Observable<OrderUnit[]> {

    let retval$ = new Subject<OrderUnit[]>();

    this.http.get<OrderUnit[]>(`${SERVICE_URL}/orderUnits`).subscribe((orderUnits: OrderUnit[]) => {

      retval$.next(orderUnits)

    });

    return retval$.asObservable();
  }

  public createOrderUnit(name: string): Observable<OrderUnit> {

    let retval$ = new Subject<OrderUnit>();
    this.http.post<OrderUnit>(`${SERVICE_URL}/orderUnits/${name}`,name).subscribe((helper: OrderUnit) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }



 
  public deleteOrderUnit(orderUnit: OrderUnit): Observable<OrderUnit> {


    let retval$ = new Subject<OrderUnit>();
    this.http.delete<OrderUnit>(`${SERVICE_URL}/orderUnits/${orderUnit.OrderUnitId}`,{headers:this.headers}).subscribe((helper: OrderUnit) => {
      retval$.next(helper)
    })


    return retval$.asObservable();
  }

  public editOrderUnit(orderUnit: OrderUnit): Observable<OrderUnit> {

    let retval$ = new Subject<OrderUnit>();

    this.http.put<OrderUnit>(`${SERVICE_URL}/orderUnits`, orderUnit,{headers:this.headers}).subscribe((helper: OrderUnit) => {

      retval$.next(helper)

    });

    return retval$.asObservable();


  }

  public getOneOrderUnit(orderUnit: OrderUnit): Observable<OrderUnit> {

    let retval$ = new Subject<OrderUnit>();

    this.http.get<OrderUnit>(`${SERVICE_URL}/orderUnits/${orderUnit.OrderUnitId}`,{headers:this.headers}).subscribe((helper: OrderUnit) => {
      retval$.next(helper)

    });

    return retval$.asObservable();

}
}