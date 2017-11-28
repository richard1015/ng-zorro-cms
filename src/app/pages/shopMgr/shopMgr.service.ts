import { Injectable } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';

@Injectable()
export class ShopMgrService {

    constructor(private api: ApiService) { }

    /** 是否正在加载中 */
    get loading(): boolean {
        return this.api.loading;
    }

    //获取商铺信息
    public getShopInfo() {
        return this.api.Post({}, "BGetPCShopInfoList");
    }
    //修改商铺信息
    public editShopInfo(params: EditShopInfoParams, file?: File[]) {
        return this.api.Post(params, "BGetPCShopInfoUp", file);
    }
    //获取员工列表
    public getStaffList(params: StaffListParams) {
        return this.api.Post(params, "Employee");
    }
    //编辑员工
    public editStaff(params: EditStaffParams) {
        return this.api.Post(params, "EmployeeAdd");
    }
    //删除员工
    public deleteStaff(params: DelStaffParams) {
        return this.api.Post(params, "EmployeeDel");
    }
    //获取角色列表
    public getAuthList(params: AuthListParams) {
        return this.api.Post(params, "GetShopAllRole");
    }
    //新增角色
    public addAuthList(params: AddRoleParams) {
        return this.api.Post(params, "AddRole");
    }
    //获取权限列表
    public getJursList() {
        return this.api.Post({
            "PageIndex": "1",
            "PageSize": "9999"
        }, "GetUserJurs");
    }
    //获取角色对应权限
    public getJursById(params: JursByIdParams) {
        return this.api.Post(params, "RoleJurisList");
    }
    //修改角色权限
    public editJurs(params: EditJursByIdParams) {
        return this.api.Post(params, "UpdateRoleJuris");
    }
     //获取商铺二维码加加密值
     public getShopSign(params) {
        return this.api.Post(params, "richardSignTemp");
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
export class DelStaffParams {
    Id: number;
}
export class EditStaffParams {
    Id: number = 0;
    JobNumber: string = "";
    JobName: string = "";
    Phone: string = "";
    Pwd: string = "";
    RoleID: string = "";
    KitchenId: string = "";
    JurisID:string="";
}
export class AddRoleParams {
    RoleName: string;
}
export class JursByIdParams {
    RoleId: number;
}
export class EditJursByIdParams {
    RoleID: number;
    JurisID: string;
}
