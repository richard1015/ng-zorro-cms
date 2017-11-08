import { Injectable } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';

@Injectable()
export class DishMgrService {

    constructor(private api: ApiService) { }
    //获取菜品列表
    public getDishList(params: DishListParams) {
        return this.api.Post(params, "BGetMenuList");
    }
    //删除菜品
    public delDish(params: DelDishParams) {
        return this.api.Post(params, "BGetMenuDel");
    }
    //获取套餐列表
    public getSetMenuList(params: SetMenuListParams) {
        return this.api.Post(params, "BGetMenuTCList");
    }
    //获取菜品单位列表
    public getUnitList(params: UnitListParams) {
        return this.api.Post(params, "BGetMenuCompanyList");
    }
    //编辑菜品单位
    public editUnit(params: EditUnitParams) {
        return this.api.Post(params, "BGetMenuCompanyAdd");
    }
    //获取菜品类型列表
    public getTypeList(params: UnitListParams) {
        return this.api.Post(params, "BGetMenuTypeList");
    }
    //编辑菜品类型
    public editType(params: EditTypeParams) {
        return this.api.Post(params, "BGetMenuTypeAdd");
    }
    //获取菜品口味列表
    public getFlavorList(params: FlavorListParams) {
        return this.api.Post(params, "BGetMenuFlavorList");
    }
    //编辑菜品口味
    public editFlavor(params: EditFlavorParams) {
        return this.api.Post(params, "BGetMenuFlavorAdd");
    }
    //获取后厨列表
    public getKitchenList(params: KitchenListParams) {
        return this.api.Post(params, "BGetMenuKitchenList");
    }
    //编辑后厨
    public editKitchen(params: EditKitchenParams) {
        return this.api.Post(params, "BGetMenuKitchenAdd");
    }
    //新增/修改菜品
    public editDish(params: EditDishParams, file?: File[]) {
        return this.api.Post(params, "BGetMenuAdd", file);
    }
    //新增/修改套餐
    public editSetMenu(params: EditSetMenuParams, file?: File[]) {
        return this.api.Post(params, "BGetMenuInfoAdd", file);
    }
    //根据名称搜索普通菜品（用于添加套餐时，选择菜品）
    public searchDishByName(params: DishByNameParams) {
        return this.api.Post(params, "BGetMenuInfoByName");
    }

}
export class DishListParams {
    Id: number = 0;
    PageIndex: number = 1;
    PageSize: number = 10;
    MenuName: string = "";
}
export class DelDishParams {
    Id: number = 0;
}
export class UnitListParams {
    Id: number = 0;
    PageIndex: number = 1;
    PageSize: number = 9999;
}
export class TypeListParams {
    Id: number = 0;
    PageIndex: number = 1;
    PageSize: number = 9999;
}

export class SetMenuListParams {
    Id: number = 0;
    PageIndex: number = 1;
    PageSize: number = 10;
    MenuName: string = "";
}


//  BaseEditParams
class BaseEditParams {
    Id: number = 0;
    SName: string;
}
export class EditTypeParams extends BaseEditParams {

}
export class EditFlavorParams extends BaseEditParams {

}
export class EditKitchenParams extends BaseEditParams {

}
export class EditUnitParams extends BaseEditParams {

}
export class FlavorListParams {
    Id: number = 0;
    PageIndex: number = 1;
    PageSize: number = 9999;
}
export class KitchenListParams {
    Id: number = 0;
    PageIndex: number = 1;
    PageSize: number = 9999;
}
export class EditDishParams {
    Id: number = 0;
    MenuName: string = "";
    MenuPrice: string = "";
    TypeId: string = "";
    KitchenId: string = "";
    CompanyId: string = "";
    FlavorId: string = "";
}

export class EditSetMenuParams {
    Id: number = 0;
    MenuName: string = "";
    MenuPrice: string = "";
    TypeId: string = "";
    KitchenId: string = "";
    CompanyId: string = "";
    MenuId: string = "";
    MenuPeople: string = "";
}

export class DishByNameParams {
    MenuName: string = "";
}


