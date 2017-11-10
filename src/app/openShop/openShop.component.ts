import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import swal from 'sweetalert';
import { ApiService } from '../SERVICE/api.service';
@Component({
  selector: 'app-openShop',
  templateUrl: './openShop.component.html',
  styleUrls: ['./openShop.component.css']
})
export class OpenShopComponent implements OnInit {

  constructor( private fb: FormBuilder,private api: ApiService) { }

  _data: any = {};
  file: File[];
  validateForm: FormGroup;
  ngOnInit() {
    this.validateForm = this.fb.group(new EditShopInfoParams());
  }
  fileChange($event) {
    this.file = $event.target.files;
  }
  submit() {
    let params = this.validateForm.value;

    this.editShopInfo(params, this.file).subscribe(res => {
      if (res.State == 0) {
        swal(res.Msg, {
          icon: `success`, timer: 1000,
        });
      }
    });
  }

  //修改商铺信息
  public editShopInfo(params: EditShopInfoParams, file?: File[]) {
      return this.api.Post(params, "BGetPCShopAdd", file);
  }
}

class EditShopInfoParams {
  Id: number = 0;
  ShopName: string = "";
  ShopAddress: string = "";
  ShopImg: string = "";
  Tell: string = "";
  BossId: number = 0;
  BusinessHours: string = "";
  JobNumber: string = "";
  JobName: string = "";
  Phone: string = "";
}