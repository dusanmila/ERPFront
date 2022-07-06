import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { WebcamModule } from 'ngx-webcam';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatAutocompleteModule } from "@angular/material/autocomplete";


import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AdminComponent } from './components/adminpage/adminpage.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ProductComponent } from './components/product/product.component';
import { OrderComponent } from './components/order/order.component';

import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { UserCreateDialogComponent } from './components/user-create-dialog/user-create-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    OrderComponent,
    UserComponent,
    LoginComponent,
    AdminComponent,
    CartComponent,
    UserCreateDialogComponent

  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    WebcamModule,
    MatCheckboxModule,
    BrowserModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

