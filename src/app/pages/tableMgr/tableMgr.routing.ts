import { Routes, RouterModule } from '@angular/router';
import { TableMgrComponent } from './tableMgr.component';

const routes: Routes = [
  { path: '', component: TableMgrComponent },
];

export const TableMgrRoutes = RouterModule.forChild(routes);
