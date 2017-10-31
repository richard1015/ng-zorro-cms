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

  _data: any = {};

  validateForm: FormGroup;
  ngOnInit() {
    this.validateForm = this.fb.group(new EditShopInfoParams());
    this.service.getShopInfo().subscribe(res => {
      if (res.State == 0) {
        let data = res.Value[0];
        this._data = res.Value[0];

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

  submit() {
    let params = this.validateForm.value;
    
    this.service.editShopInfo(params).subscribe(res => {
      if (res.State == 0) {
        swal(res.Msg, {
          icon: `success`,
        });
      }
    });
  }
}
