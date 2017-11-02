import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import swal from 'sweetalert';
import { TableMgrService, TableListParams, EditTableParams } from './tableMgr.service';
@Component({
  selector: 'app-tableMgr',
  templateUrl: './tableMgr.component.html',
  styleUrls: ['./tableMgr.component.css']
})
export class TableMgrComponent implements OnInit {


  params: TableListParams = new TableListParams();

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
    private service: TableMgrService) {
  }
  tableChange(item) {
    console.log(item);
    let params: EditTableParams = new EditTableParams();
    params.Id = item.Id || 0;
    params.DtNumber = item.DtNumber;
    params.DtPeople = item.DtPeople;
    this.service.editTable(params).subscribe((res) => {
      if (res.State == 0) {
        swal(res.Msg, {
          icon: `success`,
        });
      }
    });
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
    this.service.getTableList(this.params).subscribe(res => {
      this._loading = false;
      if (res.State == 0) {
        this._dataSet = res.Value;
        this._dataSetCount = res.TotalNumber;
      }
    });
  }
  edit(item: any = {}) {
    swal({
      title: '请输入桌号名称',
      text: item.SName || "",
      content: 'input',
      buttons: ['取消', '确定'],
    })
      .then(text => {
        if (text) {
          let params: EditTableParams = new EditTableParams();
          params.DtNumber = text;
          this.service.editTable(params).subscribe((res) => {
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
