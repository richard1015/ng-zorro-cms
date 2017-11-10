import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopMgrComponent } from './shopMgr.component';
import { ShopMgrRoutes } from './shopMgr.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from "ng-zorro-antd";
import { ShopMgrService } from './shopMgr.service';
import { StaffComponent } from './staff/staff.component';
import { AuthComponent } from './auth/auth.component';
import { StaffEditComponent } from './staff/staffEdit/staffEdit.component';
import { DishMgrService } from '../dishMgr/dishMgr.service';
import { AuthEditComponent } from './auth/authEdit/authEdit.component';
import { UnitService } from '../../SERVICE/unit.service';
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
    StaffEditComponent,
    AuthComponent,
    AuthEditComponent
],
  providers:[ShopMgrService,DishMgrService,UnitService]
})
export class ShopMgrModule { }