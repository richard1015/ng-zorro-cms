import { Routes, RouterModule } from '@angular/router';
import { DishMgrComponent } from './pages/dishMgr/dishMgr.component';
import { OpenShopComponent } from './openShop/openShop.component';

const routes: Routes = [
  { path: 'dishMgr', loadChildren: "app/pages/dishMgr/dishMgr.module#DishMgrModule", data: { title: '菜品管理' } },
  { path: 'tableMgr', loadChildren: "app/pages/tableMgr/tableMgr.module#TableMgrModule", data: { title: '桌台管理' } },
  { path: 'shopMgr', loadChildren: "app/pages/shopMgr/shopMgr.module#ShopMgrModule", data: { title: '商铺管理' } },

  { path: 'zsfMgr', component: OpenShopComponent }
];

export const AppRoutes = RouterModule.forRoot(routes);
