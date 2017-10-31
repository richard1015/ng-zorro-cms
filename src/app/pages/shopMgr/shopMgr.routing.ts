import { Routes, RouterModule } from '@angular/router';
import { ShopMgrComponent } from './shopMgr.component';
import { AuthComponent } from './auth/auth.component';
import { StaffComponent } from './staff/staff.component';

const routes: Routes = [
  { path: '', component: ShopMgrComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'auth', component: AuthComponent },
];

export const ShopMgrRoutes = RouterModule.forChild(routes);
