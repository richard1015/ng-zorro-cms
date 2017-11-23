import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import swal from 'sweetalert';
import { ApiService } from '../SERVICE/api.service';

@Component({
  selector: 'app-bindShopIdQrcode',
  templateUrl: './bindShopIdQrcode.component.html',
  styleUrls: ['./bindShopIdQrcode.component.css']
})
export class BindShopIdQrcodeComponent implements OnInit {

  constructor( private fb: FormBuilder,private api: ApiService) { }
  
    _data: any = {};
    validateForm: FormGroup;
    ngOnInit() {
      this.validateForm = this.fb.group(new EditShopInfoParams());
    }
  
    submit() {
      let params = this.validateForm.value;
  
      this.editShopInfo(params).subscribe(res => {
        if (res.State == 0) {
          swal(res.Msg, {
            icon: `success`, timer: 1000,
          });
          this.validateForm.controls.ShopSign.setValue(res.Value);
        }
      });
    }
  
    //修改商铺信息
    public editShopInfo(params: EditShopInfoParams) {
        return this.api.Post(params, "richardSignTemp");
    }
  }
  
  class EditShopInfoParams {
    ShopId: number = 0;
    ShopSign:string="";
  }