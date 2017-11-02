import { Routes, RouterModule } from '@angular/router';
import { ShopMgrComponent } from './shopMgr.component';
import { AuthComponent } from './auth/auth.component';
import { StaffComponent } from './staff/staff.component';
import { StaffEditComponent } from './staff/staffEdit/staffEdit.component';
import { AuthEditComponent } from './auth/authEdit/authEdit.component';

const routes: Routes = [
  { path: '', component: ShopMgrComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'staff/edit/:id', component: StaffEditComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'auth/edit/:id', component: AuthEditComponent },
];

export const ShopMgrRoutes = RouterModule.forChild(routes);
