import { Component, OnInit } from '@angular/core';
import { ShopMgrService, EditShopInfoParams } from './shopMgr.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import swal from 'sweetalert';
@Component({
  selector: 'app-shopMgr',
  templateUrl: './shopMgr.component.html',
  styleUrls: ['./shopMgr.component.css']
})
export class ShopMgrComponent implements OnInit {

  constructor(private service: ShopMgrService, private fb: FormBuilder) { }
  qrcodeStr="生成中……";
  _data: any = { Id: 0 };
  file: File[];
  validateForm: FormGroup;
  ngOnInit() {
    this.validateForm = this.fb.group(new EditShopInfoParams());
    this.service.getShopInfo().subscribe(res => {
      if (res.State == 0) {
        let data = res.Value[0];
        this._data = res.Value[0];
        this.getShopSign(this._data.Id);
     
        let editInfo = new EditShopInfoParams();
        editInfo.Tell = data.Tell;
        editInfo.BusinessHours = data.BusinessHours;
        editInfo.ShopAddress = data.ShopAddress;
        editInfo.ShopImg = data.ShopImg;
        editInfo.ShopName = data.ShopName;
        this.validateForm = this.fb.group(editInfo);
      }
    });
  }
  getShopSign(id) {
    this.service.getShopSign({
      ShopId: id
    }).subscribe(res => {
      if (res.State == 0) {
        // swal(res.Msg, {
        //   icon: `success`, timer: 1000,
        // });
        this.qrcodeStr=res.Value;
      }
    });
  }
  fileChange($event) {
    this.file = $event.target.files;
  }
  submit() {
    let params = this.validateForm.value;

    this.service.editShopInfo(params, this.file).subscribe(res => {
      if (res.State == 0) {
        swal(res.Msg, {
          icon: `success`, timer: 1000,
        });
      }
    });
  }
}
