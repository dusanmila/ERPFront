import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/Services/order.service';
import { FormGroup } from '@angular/forms';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  displayedColumns = ["orderId","totalPrice","date","userId","resolved"];
  dataSource: MatTableDataSource<Order>;

tableForm:FormGroup;
search : string ="";

searchClicked: boolean = false;

isLoading=false;

selectedOrder:Order;

  constructor(public orderService: OrderService, private dialog:MatDialog) { }

  ngOnInit(): void {

    this.loadData();


  }

public loadData(){
  this.orderService.getOrders().subscribe(data => {

    this.dataSource = new MatTableDataSource(data);
    this.isLoading=false;
});
}


  public selectOrder(order:Order){
    this.orderService.getOneOrder(order).subscribe(data => {
      this.selectedOrder=data;
    }) ;
   }




  
  public deleteOrder()
  {

    this.orderService.deleteOrder(this.selectedOrder).subscribe(data =>{
    });
  }

  public resolve(order:Order)
  {

    this.orderService.resolve(order).subscribe(data =>{

      console.log(data);
     
    });
    this.loadData();
  }


}
