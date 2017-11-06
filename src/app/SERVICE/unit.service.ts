import { Injectable } from '@angular/core';

@Injectable()
export class UnitService {

    constructor() { }

    /**
         * range参数支持正负数，里面也加了判断;type【为可选参数】有两种，一个是字符串one，一个是more；前者返回一个指定的日期；后者返回一个排序好的范围
         * http://blog.csdn.net/crper/article/details/55194334
         * @param {number} range
         * @param {string} [type]
         * @memberOf VehicleOverviewComponent
         * @description 获取今天及前后天
         */
    getRangeDate(range: number, type?: string): any {
        const now = this.formatDate(new Date().getTime()); // 当前时间
        const resultArr: Array<any> = [];
        let changeDate: string;
        if (range) {
            if (type) {
                if (type === 'one') {
                    changeDate = this.formatDate(new Date().getTime() + (1000 * 3600 * 24 * range));
                    console.log(changeDate);
                }
                if (type === 'more') {
                    if (range < 0) {
                        for (let i = Math.abs(range); i >= 0; i--) {
                            resultArr.push(this.formatDate(new Date().getTime() + (-1000 * 3600 * 24 * i)));
                            console.log(resultArr);
                            return changeDate;
                        }
                    } else {
                        for (let i = 1; i <= range; i++) {
                            resultArr.push(this.formatDate(new Date().getTime() + (1000 * 3600 * 24 * i)));
                            console.log(resultArr);
                            return resultArr;
                        }
                    }

                }
            } else {
                changeDate = this.formatDate(new Date().getTime() + (1000 * 3600 * 24 * range));
                console.log(changeDate);
                return changeDate;
            }
        } else {
            console.log(now);
            return now;
        }
    }


    formatDate = (time: any) => {
        // 格式化日期，获取今天的日期
        const Dates = new Date(time);
        const year: number = Dates.getFullYear();
        const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + month + '-' + day;
    };

}
