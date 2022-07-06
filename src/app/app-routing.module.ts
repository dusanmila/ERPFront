import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { UserComponent } from './components/user/user.component';
import { AdminGuard } from  './admin/admin.guard';
import { AdminComponent } from './components/adminpage/adminpage.component';
import { ProductComponent } from './components/product/product.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [

  {path:'', redirectTo:'product',pathMatch:'full'},
  {path:'product', component:ProductComponent},
  {path:'order', component:OrderComponent},
  {path:'admin', component:AdminComponent},
  {path:'login',component:LoginComponent},
  {path:'admin', component:AdminComponent,canActivate:[AdminGuard]},//can activate mora ovde,
  {path:'cart', component:CartComponent}
  //{path:'shop',component:StoreCheckComponent}

  /*
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'user', component:UserComponent,canActivate: [AdminGuard]},
  {path:'admin', component:AdminpageComponent,canActivate: [AdminGuard], data: {admin: true}},
  {path:'position', component:PositionComponent,canActivate: [AdminGuard]},
  {path:'object', component:ObjectComponent,canActivate: [AdminGuard]},
  {path:'storeCheckPage/:workModel/:objectName',component:StoreCheckPageComponent,canActivate: [AdminGuard]},
  {path:'storeCheck',component:StoreCheckComponent,canActivate: [AdminGuard]},
  {path:'login',component:LoginComponent},
  {path:'chooseObject/:workModel',component:ChooseObjectComponent,canActivate: [AdminGuard]},
  {path:'resolvedFeebacks/:objectName', component:ResolvedFeedbackComponent,canActivate: [AdminGuard]}
*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
