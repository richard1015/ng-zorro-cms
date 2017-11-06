import { Routes, RouterModule } from '@angular/router';
import { TableMgrComponent } from './tableMgr.component';
import { ShowTableInfoComponent } from './showTableInfo/showTableInfo.component';

const routes: Routes = [
  { path: '', component: TableMgrComponent },
  { path: 'showInfo/:tableId', component: ShowTableInfoComponent }
];

export const TableMgrRoutes = RouterModule.forChild(routes);
