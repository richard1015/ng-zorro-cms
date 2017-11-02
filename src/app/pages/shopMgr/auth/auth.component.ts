import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import swal from 'sweetalert';
import { ShopMgrService, AuthListParams, AddRoleParams } from '../shopMgr.service';
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


    params: AuthListParams = new AuthListParams();

    _dataSet = [];
    _dataSetCount = 0;
    _pageIndex = 1;
    _pageSize = 10;

    _bordered = true;
    _loading = false;
    _deleting = false;

    _pagination = true;
    _header = true;
    _title = true;
    _footer = true;
    _fixHeader = false;
    _size = 'default';

    constructor(private fb: FormBuilder,
        private routerInfo: ActivatedRoute,
        private router: Router,
        private message: NzMessageService,
        private service: ShopMgrService) {
    }

    ngOnInit() {
        this.search(true);
    }
    search(reset: boolean = false) {
        if (reset)
            this._pageIndex = 1;
        this.params.PageIndex = this._pageIndex;
        this.params.PageSize = this._pageSize;

        this._loading = true;
        this.service.getAuthList(this.params).subscribe(res => {
            this._loading = false;
            if (res.State == 0) {
                this._dataSet = res.Value;
                this._dataSetCount = res.TotalNumber;
            }
        });
    }
    add() {
        swal({
            title: '角色请输入名称',
            content: 'input',
            buttons: ['取消', '确定'],
        })
            .then(text => {
                if (text) {
                    let params: AddRoleParams = new AddRoleParams();
                    params.RoleName = text;
                    this.service.addAuthList(params).subscribe((res) => {
                        if (res.State == 0) {
                            this.search(true);
                            swal(res.Msg, {
                                icon: `success`,
                            });
                        }
                    });

                } else {
                    swal.stopLoading();
                    swal.close();
                }
            })
            .catch(err => {
                if (err) {
                    swal('Oh noes!', '服务器异常，请稍后再试!', 'error');
                } else {
                    swal.stopLoading();
                    swal.close();
                }
            });
    }
    delete(id: number, idx: number) {
        swal(`暂未开放此功能!`, {
            icon: `info`,
        });

        // this._deleting = true;
        // this.delDishParams.Id=id;
        // this.service.delDish(this.delDishParams).subscribe((res) => {
        //   this._deleting = false;
        //   if (res.State == 0) {
        //     this.message.create('success', res.Msg);
        //     this._dataSet.splice(idx, 1);
        //   }
        // });
    }
    cancel() {
    }

}
