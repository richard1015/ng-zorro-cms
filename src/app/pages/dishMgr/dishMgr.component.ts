import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DishMgrService, DishListParams, DelDishParams } from './dishMgr.service';
import { LocalStorage } from '../../SERVICE/local.storage';

@Component({
  selector: 'app-dishMgr',
  templateUrl: './dishMgr.component.html',
  styleUrls: ['./dishMgr.component.css']
})
export class DishMgrComponent implements OnInit {
  dishListParams: DishListParams = new DishListParams();
  delDishParams: DelDishParams = new DelDishParams();

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
    private ls: LocalStorage,
    private message: NzMessageService,
    private service: DishMgrService) {
  }

  ngOnInit() {
    this.search(true);
  }
  clear() {
    this.dishListParams.MenuName = "";
    this.search(true);
  }
  search(reset: boolean = false) {
    if (reset)
      this._pageIndex = 1;
    this.dishListParams.PageIndex = this._pageIndex;
    this.dishListParams.PageSize = this._pageSize;
    this._loading = true;
    this.service.getDishList(this.dishListParams).subscribe(res => {
      this._loading = false;
      if (res.State == 0 && res.Value) {
        this._dataSet = res.Value;
        this._dataSetCount = res.TotalNumber;
      } else {
        this._dataSet = [];
        this._dataSetCount = 0;
      }
    });
  }
  delete(id: number, idx: number) {
    this._deleting = true;
    this.delDishParams.Id = id;
    this.service.delDish(this.delDishParams).subscribe((res) => {
      this._deleting = false;
      if (res.State == 0) {
        this.message.create('success', res.Msg);
        this._dataSet.splice(idx, 1);
      }
    });
  }
  cancel() {
  }
}
