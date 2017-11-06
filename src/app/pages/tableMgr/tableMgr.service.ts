import { Injectable } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';
@Injectable()
export class TableMgrService {
    constructor(private api: ApiService) { }
    //获取桌台列表
    public getTableList(params: TableListParams) {
        return this.api.Post(params, "BGetTableList");
    }
    //编辑桌台信息
    public editTable(params: EditTableParams) {
        return this.api.Post(params, "BGetTableAdd");
    }
    //查看桌台历史账单
    public getTableInfo(params: TableInfoListParams) {
        return this.api.Post(params, "BGetHistoryBillList");
    }
    //查看历史账单详情
    public getOrderInfo(params: OrderInfoParams) {
        return this.api.Post(params, "BGetHistoryBillInfo");
    }
}
export class TableListParams {
    private DtState: number = -1;
    PageIndex: number = 1;
    PageSize: number = 10;
}
export class EditTableParams {
    Id: number = 0;
    DtNumber: string;
    DtPeople: number;
}
export class TableInfoListParams {
    ShopTableId: number = 0;
    StarTime: string;
    EndTime: string;
    PageIndex: number = 1;
    PageSize: number = 10;
}
export class OrderInfoParams {
    Id: number=0;
}
