import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableMgrComponent } from './tableMgr.component';
import { TableMgrRoutes } from './tableMgr.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from "ng-zorro-antd";
import { TableMgrService } from './tableMgr.service';
import { ShowTableInfoComponent } from './showTableInfo/showTableInfo.component';
import { UnitService } from '../../SERVICE/unit.service';
@NgModule({
  imports: [
    CommonModule,
    TableMgrRoutes,
    ReactiveFormsModule,
    NgZorroAntdModule,
    FormsModule,
  ],
  declarations: [TableMgrComponent,
    ShowTableInfoComponent
],
  providers: [TableMgrService,UnitService]
})
export class TableMgrModule { }