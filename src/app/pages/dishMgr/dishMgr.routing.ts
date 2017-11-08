import { Routes, RouterModule } from '@angular/router';
import { DishMgrComponent } from './dishMgr.component';
import { DishEditComponent } from './dishEdit/dishEdit.component';
import { TypeListComponent } from './typeList/typeList.component';
import { UnitListComponent } from './unitList/unitList.component';
import { KitchenListComponent } from './kitchenList/kitchenList.component';
import { FlavorListComponent } from './flavorList/flavorList.component';
import { SetMenuListComponent } from './setMenuList/setMenuList.component';
import { SetMenuEditComponent } from './setMenuList/setMenuEdit/setMenuEdit.component';

const routes: Routes = [
  { path: '', component: DishMgrComponent },
  { path: 'edit/:id', component: DishEditComponent },
  { path: 'typeList', component: TypeListComponent },
  { path: 'flavorList', component: FlavorListComponent },
  { path: 'kitchenList', component: KitchenListComponent },
  { path: 'unitList', component: UnitListComponent },
  { path: 'setMenuList', component: SetMenuListComponent },
  { path: 'setMenuList/setMenuEdit/:id', component: SetMenuEditComponent },
];

export const DishMgrRoutes = RouterModule.forChild(routes);
