import { Injectable } from '@angular/core';
import { ApiService } from './SERVICE/api.service';

@Injectable()
export class AppService {

    constructor(private api: ApiService) { }
    //获取老板下所有门店
    public getBossShops(params: boosShopsParams) {
        return this.api.Post(params, "BossShops");
    }
    //设置老板访问门店
    public setBossShop(params: setBossShopParams) {
        return this.api.Post(params, "BossSetSpotID");
    }

}
export class boosShopsParams {
    PageIndex: number = 1;
    PageSize: number = 999;
}
export class setBossShopParams {
    ShopID: number = 0;
}