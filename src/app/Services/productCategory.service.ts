import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProductCategory } from '../models/productCategory';
import { SERVICE_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  constructor(private http: HttpClient) { }

  private readonly headers:HttpHeaders=new HttpHeaders({'Authorization':"Bearer "+localStorage.getItem("jwt")});


  public getProductCategorys(): Observable<ProductCategory[]> {

    let retval$ = new Subject<ProductCategory[]>();

    this.http.get<ProductCategory[]>(`${SERVICE_URL}/productCategories`,{headers:this.headers}).subscribe((productCategorys: ProductCategory[]) => {

      retval$.next(productCategorys)

    });

    return retval$.asObservable();
  }

  public createProductCategory(productCategory: ProductCategory): Observable<ProductCategory> {

    let retval$ = new Subject<ProductCategory>();
    this.http.post<ProductCategory>(`${SERVICE_URL}/productCategories`, productCategory,{headers:this.headers}).subscribe((helper: ProductCategory) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }



 
  public deleteProductCategory(productCategory: ProductCategory): Observable<ProductCategory> {


    let retval$ = new Subject<ProductCategory>();
    this.http.delete<ProductCategory>(`${SERVICE_URL}/productCategories/${productCategory.ProductCategoryId}`,{headers:this.headers}).subscribe((helper: ProductCategory) => {
      retval$.next(helper)
    })


    return retval$.asObservable();
  }

  public editProductCategory(productCategory: ProductCategory): Observable<ProductCategory> {

    let retval$ = new Subject<ProductCategory>();

    this.http.put<ProductCategory>(`${SERVICE_URL}/productCategories`, productCategory,{headers:this.headers}).subscribe((helper: ProductCategory) => {

      retval$.next(helper)

    });

    return retval$.asObservable();


  }

  public getOneProductCategory(productCategory: ProductCategory): Observable<ProductCategory> {

    let retval$ = new Subject<ProductCategory>();

    this.http.get<ProductCategory>(`${SERVICE_URL}/productCategories/${productCategory.ProductCategoryId}`,{headers:this.headers}).subscribe((helper: ProductCategory) => {
      retval$.next(helper)

    });

    return retval$.asObservable();

  }


}
