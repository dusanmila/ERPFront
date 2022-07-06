
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Observable, Subject } from 'rxjs';
import { Product } from '../models/product';

import { SERVICE_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  private readonly headers:HttpHeaders=new HttpHeaders({'Authorization':"Bearer "+localStorage.getItem("jwt")});


  public getProducts(): Observable<Product[]> {

    let retval$ = new Subject<Product[]>();

    this.http.get<Product[]>(`${SERVICE_URL}/products`).subscribe((products: Product[]) => {

      retval$.next(products)
        
    });

    return retval$.asObservable();
  }




 
  public deleteProduct(product: Product): Observable<Product> {


    let retval$ = new Subject<Product>();
    this.http.delete<Product>(`${SERVICE_URL}/products/${product.productId}`,{headers:this.headers}).subscribe((helper: Product) => {
      retval$.next(helper)
    })


    return retval$.asObservable();
  }


  public getOneProduct(product: Product): Observable<Product> {

    let retval$ = new Subject<Product>();

    this.http.get<Product>(`${SERVICE_URL}/products/${product.productId}`,{headers:this.headers}).subscribe((helper: Product) => {
      retval$.next(helper)

    });

    return retval$.asObservable();

  }

  
  public createProduct(formData: FormData): Observable<Product> {
    let retval$ = new Subject<Product>();



    this.http.post<Product>(`${SERVICE_URL}/products`, formData,{headers:this.headers}).subscribe((helper: Product) => {

      retval$.next(helper);
    });
    return retval$;
  }

  public editProduct(formData: FormData): Observable<Product> {
    let retval$ = new Subject<Product>();
 

    this.http.put<Product>(`${SERVICE_URL}/products`, formData,{headers:this.headers}).subscribe((helper: Product) => {
      retval$.next(helper);
    });
    return retval$;
  }

 
}


