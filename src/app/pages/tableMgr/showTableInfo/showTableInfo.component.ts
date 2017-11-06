import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
import { TableMgrService, TableInfoListParams, OrderInfoParams } from '../tableMgr.service';
import { UnitService } from '../../../SERVICE/unit.service';

@Component({
  selector: 'app-showTableInfo',
  templateUrl: './showTableInfo.component.html',
  styleUrls: ['./showTableInfo.component.css']
})
export class ShowTableInfoComponent implements OnInit {

  params: TableInfoListParams = new TableInfoListParams();


  _beginTime: Date;
  _endTime: Date;

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
    private service: TableMgrService,
    private unitService: UnitService
  ) { }


  ngOnInit() {

    this._beginTime = new Date(this.unitService.getRangeDate(-30));
    this._endTime = new Date(this.unitService.getRangeDate(0));

    this.search(true);
  }
  search(reset: boolean = false) {
    if (reset)
      this._pageIndex = 1;
    this.params.PageIndex = this._pageIndex;
    this.params.PageSize = this._pageSize;
    this.params.StarTime = this.unitService.formatDate(this._beginTime);
    this.params.EndTime = this.unitService.formatDate(this._endTime);
    let tableId = this.routerInfo.snapshot.params["tableId"];
    this.params.ShopTableId = tableId;

    this._loading = true;
    this.service.getTableInfo(this.params).subscribe(res => {
      this._loading = false;
      if (res.State == 0 && res.Value) {
        let object = res.Value;
        for (var key in object) {
          object[key]["expand"] = false;
          object[key]["List"] = [];
        }
        this._dataSet = object;
        this._dataSetCount = res.TotalNumber;
      }
    });
  }
  readerOrder(item) {
    if (item.expand) {
      if (item.List.length > 0) return;
      let params: OrderInfoParams = new OrderInfoParams();
      params.Id = item.Id;
      this.service.getOrderInfo(params).subscribe(res => {
        if (res.State == 0 && res.Value) {
          item.List = res.Value.List;
        }
      });
    }
  }
  clear() {

    this.search(true);
  }



}
