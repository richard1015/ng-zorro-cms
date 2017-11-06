import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DishMgrService, FlavorListParams, EditFlavorParams } from '../dishMgr.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-flavorList',
  templateUrl: './flavorList.component.html',
  styleUrls: ['./flavorList.component.css']
})
export class FlavorListComponent implements OnInit {

  params: FlavorListParams = new FlavorListParams();
  
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
          private service: DishMgrService) {
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
          this.service.getFlavorList(this.params).subscribe(res => {
              this._loading = false;
              if (res.State == 0 && res.Value) {
                  this._dataSet = res.Value;
                  this._dataSetCount = res.TotalNumber;
              }
          });
      }
      edit(item: any = {}) {
          swal({
              title: '请输入名称',
              text: item.SName || "",
              content: 'input',
              buttons: ['取消', '确定'],
          })
              .then(text => {
                  if (text) {
                      let params: EditFlavorParams = new EditFlavorParams();
                      params.Id = item.Id || 0;
                      params.SName = text;
                      this.service.editFlavor(params).subscribe((res) => {
                          if (res.State == 0) {
                              if (item.SName) {
                                  item.SName = text;
                              } else {
                                  this.search(true);
                              }
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
