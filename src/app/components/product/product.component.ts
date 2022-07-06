
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from '../../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Order } from 'src/app/models/order';
import { OrderUnitService } from 'src/app/Services/orderUnit.service';
import { OrderUnit } from 'src/app/models/orderUnit';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns = ["name", "price","img","manufacturer","productCategory","actions"];
  dataSource: MatTableDataSource<Product>;
  subscription: Subscription;

  order:Order;
  orderUnit:OrderUnit;

 
  public showResolved: boolean = false;

  form: FormGroup;


 

  product: Product ={productId:0, productCategory: "", name: "", price: 0, img: "", manufacturer: "" };

  selectedProduct: Product = {productId:0, productCategory: "", name: "", price: 0, img: "", manufacturer: "" };


  private _products: Product[] = []

  public get products(): Product[] {
    return this._products;
  }




  constructor(public productService: ProductService, public orderUnitService : OrderUnitService, private http: HttpClient, public fb: FormBuilder, public dialog: MatDialog) {

    this.form = this.fb.group({
      file: [null],
      productCategory: [''],
      name: [''],
      price: [null],
      manufacturer:['']
    });
  }

  ngOnInit(): void {
    
      this.loadData();
    

  }


  public loadData() {
    this.productService.getProducts().subscribe(data => {
      
      this.dataSource = new MatTableDataSource(data);
    

    });
  }



  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({
      file: file,
    });
    this.form.get('file')!.updateValueAndValidity();
  }
  submitForm() {
    var formData: any = new FormData();
    formData.append('file', this.form.get('file')!.value);
//id mozda nzm
    formData.append('ProductCategory', this.form.get('ProductCategory')!.value);
    formData.append('Name', this.form.get('Name')!.value);
    formData.append('Price', this.form.get('Price')!.value);
    formData.append('Manufacturer', this.form.get('Manufacturer')!.value);
    this.http
       .post('http://localhost:8088/api/products', formData)
      .subscribe({
        next: (response) => {
        
        },
        error: (error) => console.log(error)

      });
  }
 

 

  selectProduct(product: Product) {
    this.productService.getOneProduct(product).subscribe(data => {
      this.selectedProduct = data;
    });
    this.product = product;

  }








  public addToCart(product:Product)
  {
   
    this.orderUnitService.createOrderUnit(product.name).subscribe(data => {

      console.log(data);
    });

    
  }
  

  }


