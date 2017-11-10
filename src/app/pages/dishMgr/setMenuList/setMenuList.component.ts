import { Component, OnInit } from '@angular/core';
import { SetMenuListParams, DishMgrService, DelDishParams, MenuInfoListParams } from '../dishMgr.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../../../SERVICE/local.storage';
import swal from 'sweetalert';
@Component({
  selector: 'app-setMenuList',
  templateUrl: './setMenuList.component.html',
  styleUrls: ['./setMenuList.component.css']
})
export class SetMenuListComponent implements OnInit {

  listParams: SetMenuListParams = new SetMenuListParams();
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
    private service: DishMgrService) {
  }

  ngOnInit() {
    this.search(true);
  }
  clear() {
    this.listParams.MenuName = "";
    this.search(true);
  }
  search(reset: boolean = false) {
    if (reset)
      this._pageIndex = 1;
    this.listParams.PageIndex = this._pageIndex;
    this.listParams.PageSize = this._pageSize;
    this._loading = true;
    this.service.getSetMenuList(this.listParams).subscribe(res => {
      this._loading = false;
      if (res.State == 0 && res.Value) {
        this._dataSet = res.Value;
        this._dataSetCount = res.TotalNumber;

        for (var index = 0; index < this._dataSet.length; index++) {
          this.showSetMenuDetailed(this._dataSet[index])
        }

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
        swal(res.Msg, {
          icon: `success`, timer: 1000,
        });
        this._dataSet.splice(idx, 1);
      }
    });
  }
  cancel() {

  }
  showSetMenuDetailed(item) {
    item.DishInfo = "加载中……";
    let params: MenuInfoListParams = new MenuInfoListParams();
    params.MenuPid = item.Id;
    this.service.getMenuInfoList(params).subscribe((res) => {
      if (res.State == 0 && res.Value) {
        let arrayMenuName = [];
        res.Value.forEach(element => {
          arrayMenuName.push(element.MenuName);
        });
        item.DishInfo = arrayMenuName.join(',');
      } else {
        item.DishInfo = "无";
      }
    });
  }

}
