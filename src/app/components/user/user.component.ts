import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/Services/user.service';
import { UserCreateDialogComponent } from '../user-create-dialog/user-create-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  user: User = { userId: 0, firstName: "", lastName: "", username: "", password: "", userType: "" };

  selectedUser: User = { userId: 0, firstName: "", lastName: "", username: "", password: "", userType: "" };

  displayedColumns = ["firstName", "lastName", "username", "actions"];
  dataSource: MatTableDataSource<User>;
  subscription: Subscription;

  search: String = "";

  isLoading = false;

  searchClicked: boolean = false;


  public get users(): User[] {
    return this._users;
  }

  private _users: User[] = []


  constructor(public userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();

  }

  public loadData() {
    this.userService.getUsers().subscribe(data => {

      this.dataSource = new MatTableDataSource(data);
      this.isLoading = false;
    });
  }

  public selectUser(user: User) {
    this.userService.getOneUser(user).subscribe(data => {
      this.selectedUser = data;
    });
    this.user = user;
  }



  public editUser(user: User) {
    this.userService.editUser(user).subscribe(data => {

      console.log(data);

    });
  }
/*
  public openDialog(flag: number, id? : number, naziv? : string, oznaka? : string): void {
    const dialogRef = this.dialog.open(SmerDialogComponent, {data: {id,naziv,oznaka}} );
   
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(res => {
      if(res===1)
      {
        this.loadData(); 
      }
    })
  }*/

  public openDialog(flag: number, firstName?: string, lastName?: string, username?: string) {
   
    const dialogRef = this.dialog.open(UserCreateDialogComponent, { data: { firstName, lastName, username } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res === 1) {
          this.loadData();
        }
      }
      )
  }

  public setSearchClicked() {
    this.searchClicked = true;
  }


  
  public openCreateDialog() {
    const dialogRef = this.dialog.open(UserCreateDialogComponent);
    
    dialogRef.afterClosed()
      .subscribe(res => {
        
          console.log('promena')
          this.loadData();
        
      }
      )
  }

}
