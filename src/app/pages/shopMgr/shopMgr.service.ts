import { Injectable } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';

@Injectable()
export class ShopMgrService {

    constructor(private api: ApiService) { }

    //获取商铺信息
    public getShopInfo() {
        return this.api.Post({}, "BGetPCShopInfoList");
    }
    //修改商铺信息
    public editShopInfo(params: EditShopInfoParams) {
        return this.api.Post(params, "BGetPCShopInfoUp");
    }
    //获取员工列表
    public getStaffList(params: StaffListParams) {
        return this.api.Post(params, "Employee");
    }
    //获取角色列表
    public getAuthList(params: AuthListParams) {
        return this.api.Post(params, "GetShopAllRole");
    }
}

export class StaffListParams {
    Id: number = 0;
    PageIndex: number = 1;
    PageSize: number = 10;
}
export class AuthListParams {
    PageIndex: number = 1;
    PageSize: number = 10;
}
export class EditShopInfoParams {
    ShopName: string = "";
    ShopAddress: string = "";
    ShopImg: string = "";
    Tell: string = "";
    BusinessHours: string = "";
}