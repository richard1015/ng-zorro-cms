import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopMgrComponent } from './shopMgr.component';
import { ShopMgrRoutes } from './shopMgr.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from "ng-zorro-antd";
import { ShopMgrService } from './shopMgr.service';
import { StaffComponent } from './staff/staff.component';
import { AuthComponent } from './auth/auth.component';
@NgModule({
  imports: [
    CommonModule,
    ShopMgrRoutes,
    ReactiveFormsModule,
    NgZorroAntdModule,
    FormsModule,
  ],
  declarations: [ShopMgrComponent,
    StaffComponent,
    AuthComponent
],
  providers:[ShopMgrService]
})
export class ShopMgrModule { }