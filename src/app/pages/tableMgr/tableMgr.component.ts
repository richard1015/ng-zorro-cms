import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import swal from 'sweetalert';
import { TableMgrService, TableListParams, EditTableParams, ChangePriceParams, PayOrderParams, ChangeTableParams } from './tableMgr.service';
@Component({
  selector: 'app-tableMgr',
  templateUrl: './tableMgr.component.html',
  styleUrls: ['./tableMgr.component.css']
})
export class TableMgrComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    clearInterval(this.tempInterval);
  }
  tempInterval = setInterval(() => {
    this.ngOnInit();
  }, 1000 * 30);

  params: TableListParams = new TableListParams();


  //当前空闲中桌台
  _tableFreeList = [];

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
    let params: EditTableParams = new EditTableParams();
    params.Id = item.Id || 0;
    params.DtNumber = item.DtNumber;
    params.DtPeople = item.DtPeople;
    this.service.editTable(params).subscribe((res) => {
      if (res.State == 0) {
        swal(res.Msg, {
          icon: `success`, timer: 1000,
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
      if (res.State == 0 && res.Value) {
        this._dataSet = res.Value;
        this._dataSetCount = res.TotalNumber;
      }
    });
  }
  //获取空闲桌，准备转台
  getTableFreeList(item, checked) {
    if (checked) {
      if (!item.OrderNumber) {
        swal("当前桌台空闲中，不可执行此操作！", {
          icon: `info`,
        });
        return;
      }
      let params: TableListParams = new TableListParams();
      params.DtState = 0;//-1获取全部，0未开台1已开台"
      params.PageIndex = 1;
      params.PageSize = 999999;
      this.service.getTableList(params).subscribe(res => {
        if (res.State == 0 && res.Value) {
          this._tableFreeList = res.Value;
        }
      });
    }
  }
  //转台
  exchangeTable(currentTableItem, newTableItem) {
    if (!currentTableItem.OrderNumber) {
      swal("当前桌台空闲中，不可执行此操作！", {
        icon: `info`,
      });
      return;
    }

    let params: ChangeTableParams = new ChangeTableParams();
    params.OldId = currentTableItem.Id;
    params.NewId = newTableItem.Id;
    params.OrderNumber = currentTableItem.OrderNumber;

    this.service.changeTable(params).subscribe(res => {
      if (res.State == 0) {
        this.search(true);
        swal(res.Msg, {
          icon: `success`, timer: 1000,
        });
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
          params.DtPeople = 4;
          this.service.editTable(params).subscribe((res) => {
            if (res.State == 0) {
              this.search(true);
              swal(res.Msg, {
                icon: `success`, timer: 1000,
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
  pay(item, payType) {
    if (!item.OrderNumber) {
      swal("当前桌台无订单！", {
        icon: `info`,
      });
      return;
    }
    let params: PayOrderParams = new PayOrderParams();
    params.OrderNum = item.OrderNumber;
    params.PayMode = payType;

    this.service.payOrder(params).subscribe(res => {
      if (res.State == 0) {
        this.search(true);
        swal(res.Msg, {
          icon: `success`, timer: 1000,
        });
      }
    });

  }
  changePrice(item) {
    if (!item.OrderNumber) {
      swal("当前桌台空闲中，不可执行此操作！", {
        icon: `info`,
      });
      return;
    }
    swal({
      title: '请输入抹零金额',
      text: "订单金额" + item.Price,
      content: 'input',
      buttons: ['取消', '确定'],
    })
      .then(text => {
        if (text) {
          let params: ChangePriceParams = new ChangePriceParams();
          params.OrderNum = item.OrderNumber;
          params.ReducePrice = text;
          this.service.changePrice(params).subscribe((res) => {
            if (res.State == 0) {
              this.search(true);
              swal(res.Msg, {
                icon: `success`, timer: 1000,
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
