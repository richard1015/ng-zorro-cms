import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishMgrComponent } from './dishMgr.component';
import { DishMgrService } from './dishMgr.service';
import { DishMgrRoutes } from './dishMgr.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from "ng-zorro-antd";
import { DishEditComponent } from './dishEdit/dishEdit.component';
import { ImageCropperModule } from 'ng2-img-cropper';
import { TypeListComponent } from './typeList/typeList.component';
import { KitchenListComponent } from './kitchenList/kitchenList.component';
import { FlavorListComponent } from './flavorList/flavorList.component';
import { UnitListComponent } from './unitList/unitList.component';
import { SetMenuListComponent } from './setMenuList/setMenuList.component';
import { SetMenuEditComponent } from './setMenuList/setMenuEdit/setMenuEdit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    FormsModule,
    DishMgrRoutes,
    ImageCropperModule
  ],
  declarations: [
    DishMgrComponent,
    DishEditComponent,
    TypeListComponent,
    KitchenListComponent,
    FlavorListComponent,
    UnitListComponent,
    FlavorListComponent,
    KitchenListComponent,
    UnitListComponent,
    SetMenuListComponent,
    SetMenuEditComponent
],
  providers: [DishMgrService]
})
export class DishMgrModule { }