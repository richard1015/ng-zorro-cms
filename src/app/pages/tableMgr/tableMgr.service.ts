import { Injectable } from '@angular/core';
import { ApiService } from '../../SERVICE/api.service';
@Injectable()
export class TableMgrService {
    constructor(private api: ApiService) { }
    //获取桌台列表
    public getTableList(params: TableListParams) {
        return this.api.Post(params, "BGetTableList");
    }
    public editTable(params: EditTableParams) {
        return this.api.Post(params, "BGetTableAdd");
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
    DtPeople: string;
}