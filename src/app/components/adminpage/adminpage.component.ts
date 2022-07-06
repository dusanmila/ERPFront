import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';
import { ProductComponent } from '../product/product.component';
import { UserComponent } from '../user/user.component';
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminComponent implements OnInit {


  
  constructor(public dialog:MatDialog, public router: Router) { }


  ngOnInit(): void {
  }




  public logout() {
    
    localStorage.setItem("jwt", "");
    localStorage.setItem("refreshToken", "");

    this.router.navigate(['/login']);


    }

}
