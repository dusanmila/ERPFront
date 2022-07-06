import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Order } from '../models/order';
import { OrderUnit } from '../models/orderUnit';
import { OrderService } from '../Services/order.service';
import { OrderUnitService } from '../Services/orderUnit.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  displayedColumns = ["productName", "quantity"];
  dataSource: MatTableDataSource<OrderUnit>;
  subscription: Subscription;

  order: Order;
  orderUnit: OrderUnit;
  a: string;

  constructor(public orderService: OrderService,public orderUnitService: OrderUnitService) { }

  ngOnInit(): void {

    this.loadData();


  }


  public loadData() {
    this.orderUnitService.getOrderUnits().subscribe(data => {

      this.dataSource = new MatTableDataSource(data);


    });
  }


  public buy() {
   
    this.orderService.buy(this.order).subscribe(data => {
      console.log(data);
     
     
    });


  }


}
