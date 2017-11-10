import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
import { Component, OnInit } from '@angular/core';
import { StaffListParams, ShopMgrService, DelStaffParams } from '../shopMgr.service';

@Component({
    selector: 'app-staff',
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {


    params: StaffListParams = new StaffListParams();

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
        this.service.getStaffList(this.params).subscribe(res => {
            this._loading = false;
            if (res.State == 0 && res.Value) {
                this._dataSet = res.Value;
                this._dataSetCount = res.TotalNumber;
            }
        });
    }
    delete(id: number, idx: number) {
        let params: DelStaffParams = new DelStaffParams();
        params.Id = id;
        this._deleting = true;
        this.service.deleteStaff(params).subscribe((res) => {
            this._deleting = false;
            if (res.State == 0) {
                swal(res.Msg, {
                    icon: `success`, timer: 1000,
                });
                this._dataSet.splice(idx, 1);
            }
        });
    }
    cancel() {
    }

}
