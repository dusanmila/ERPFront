import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/Services/user.service';
import { Component, OnInit, Inject} from '@angular/core'; 

@Component({
  selector: 'app-user-create-dialog',
  templateUrl: './user-create-dialog.component.html',
  styleUrls: ['./user-create-dialog.component.css']
})
export class UserCreateDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
  
    public dialogRef: MatDialogRef<UserCreateDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: User,
    public userService: UserService ) {
     }


  ngOnInit(): void {

  }

  public addUser (): void {

      this.userService.createUser(this.data).subscribe(() => {
      console.log("a");
        }),
        (error: Error) => {
          console.log(error.name + ' ' + error.message);
         

        }

  }

  public updateUser(): void {

    this.userService.editUser(this.data).subscribe(() => {
    
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
       

      } 

    }

    public deleteUser() : void {

      this.userService.deleteUser(this.data.username).subscribe(() => {
       
        }),
        (error: Error) => {
          console.log(error.name + ' ' + error.message);
         
  
        } 
    }

    public cancel(): void {
      this.dialogRef.close(); 
    }


}