import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { Order } from '../models/order';
import { SERVICE_URL } from '../app.constants';




@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  private readonly headers:HttpHeaders=new HttpHeaders({'token':""+localStorage.getItem("jwt")});


  public getOrders(): Observable<Order[]> {

    let retval$ = new Subject<Order[]>();

    this.http.get<Order[]>(`${SERVICE_URL}/orders`,{headers:this.headers}).subscribe((orders: Order[]) => {

      retval$.next(orders)

    });

    return retval$.asObservable();
  }

  public createOrder(order: Order): Observable<Order> {

    let retval$ = new Subject<Order>();
    this.http.post<Order>(`${SERVICE_URL}/orders`, order,{headers:this.headers}).subscribe((helper: Order) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public createOrderUnfinished(a: string): Observable<Order> {

    let retval$ = new Subject<Order>();
    this.http.post<Order>(`${SERVICE_URL}/orders/unfinished`, a).subscribe((helper: Order) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }



 
  public deleteOrder(order: Order): Observable<Order> {


    let retval$ = new Subject<Order>();
    this.http.delete<Order>(`${SERVICE_URL}/orders/${order.orderId}`,{headers:this.headers}).subscribe((helper: Order) => {
      retval$.next(helper)
    })


    return retval$.asObservable();
  }

  public resolve (order : Order): Observable<Order> {

    let retval$ = new Subject<Order>();

    this.http.put<Order>(`${SERVICE_URL}/orders`,order,{headers:this.headers}).subscribe() ;

    return retval$.asObservable();


  }

  public getOneOrder(order: Order): Observable<Order> {

    let retval$ = new Subject<Order>();

    this.http.get<Order>(`${SERVICE_URL}/orders/${order.orderId}`,{headers:this.headers}).subscribe((helper: Order) => {
      retval$.next(helper)

    });

    return retval$.asObservable();


}


public buy(order: Order): Observable<Object> {

  let retval$ = new Subject<string>();
  this.http.post(`http://localhost:8099/api/payments/create-checkout-session`, order).subscribe(data => {
    console.log(data);
    window.location.href=data.toString();
  //  retval$.next(data);
  });
  return retval$.asObservable();
}



}
