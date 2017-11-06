import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../../../SERVICE/local.storage';
import { NzMessageService } from 'ng-zorro-antd';
import { Bounds, CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { DishMgrService, DishListParams, DelDishParams, UnitListParams, TypeListParams, FlavorListParams, KitchenListParams, EditDishParams } from '../dishMgr.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-dishEdit',
  templateUrl: './dishEdit.component.html',
  styleUrls: ['./dishEdit.component.css']
})
export class DishEditComponent implements OnInit {
  //单位
  _unitList = [];
  //类型
  _typeList = [];
  //口味
  _flavorList = [];
  //后厨
  _kitchenList = [];

  selectedOption;
  imgUrl;

  validateForm: FormGroup;


  name: string;
  data1: any;
  cropperSettings: CropperSettings;
  fileName: string;
  fileType: string;

  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;


  constructor(private fb: FormBuilder,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage,
    private service: DishMgrService) {

    this.name = 'ng-alain';
    this.cropperSettings = new CropperSettings();

    this.cropperSettings.preserveSize = false;

    this.cropperSettings.noFileInput = true;

    this.cropperSettings.width = 400;
    this.cropperSettings.height = 300;

    this.cropperSettings.croppedWidth = 400;
    this.cropperSettings.croppedHeight = 300;

    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;

    this.cropperSettings.minWidth = 100;
    this.cropperSettings.minHeight = 100;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

    this.cropperSettings.rounded = false;

    this.data1 = {};

  }

  ngOnInit() {
    this.getUnitList();
    this.getTypeList();
    this.getFlavorList();
    this.getKitchenList();
    let dishbehaviorObj = this.ls.getObject("dishbehavior");
    if (dishbehaviorObj.MenuName) {
      dishbehaviorObj.MenuName = "";
      dishbehaviorObj.MenuPrice = "";
      dishbehaviorObj.Id=0;
      this.validateForm = this.fb.group(dishbehaviorObj);
      this.selectedOption = parseInt(dishbehaviorObj.CompanyId);
    } else {
      this.validateForm = this.fb.group(new EditDishParams());
    }
    let id = this.routerInfo.snapshot.params["id"];
    if (id != "0") {
      let dishListParams: DishListParams = new DishListParams();
      dishListParams.Id = id;
      this.service.getDishList(dishListParams).subscribe(res => {
        if (res.State == 0) {
          let data = res.Value[0];
          let editInfo = new EditDishParams();
          editInfo.Id = data.Id;
          editInfo.CompanyId = data.CompanyId;
          editInfo.FlavorId = data.FlavorId;
          editInfo.KitchenId = data.KitchenId;
          editInfo.MenuName = data.MenuName;
          editInfo.MenuPrice = data.MenuPrice;
          editInfo.TypeId = data.TypeId;

          this.validateForm = this.fb.group(editInfo);

          this.selectedOption = parseInt(data.CompanyId);
          this.imgUrl = data.MenuImage;
          console.log(this.validateForm.value);
        }
      });
    }
  }

  submit() {
    let params = this.validateForm.value;
    for (const key in params) {
      let _data = params[key];
      if (Array.isArray(_data)) {
        _data = _data.toString();
        params[key] = _data;
      }
    }
    // let file: File[];
    // if (this.data1.image) {
    //   file = [this.convertBase64UrlToBlob(this.data1.image)] as File[];
    // }

    this.ls.setObject("dishbehavior", params);

    this.service.editDish(params, this.file).subscribe(res => {
      if (res.State == 0) {
        swal(res.Msg, {
          icon: `success`,
          timer: 1000,
        });
        this.router.navigateByUrl('/dishMgr');
      }
    });
  }
  cancel() {
    this.router.navigateByUrl('/dishMgr');
  }

  getUnitList() {
    let params: UnitListParams = new UnitListParams();
    params.PageSize = 9999;
    this.service.getUnitList(params).subscribe(res => {
      if (res.State == 0) {
        this._unitList = res.Value;
      }
    });
  }
  getTypeList() {
    let params: TypeListParams = new TypeListParams();
    params.PageSize = 9999;
    this.service.getTypeList(params).subscribe(res => {
      if (res.State == 0) {
        this._typeList = res.Value;
      }
    });
  }
  getFlavorList() {
    let params: FlavorListParams = new FlavorListParams();
    params.PageSize = 9999;
    this.service.getFlavorList(params).subscribe(res => {
      if (res.State == 0) {
        this._flavorList = res.Value;
      }
    });
  }
  getKitchenList() {
    let params: KitchenListParams = new KitchenListParams();
    params.PageSize = 9999;
    this.service.getKitchenList(params).subscribe(res => {
      if (res.State == 0) {
        this._kitchenList = res.Value;
      }
    });
  }


  cropped(bounds: Bounds) {
    console.log(bounds);
  }
  file: File[];
  fileChange($event) {
    this.file = $event.target.files;
    let filename = this.file[0].name;
    this.validateForm.controls.MenuName.setValue(filename.substring(0, filename.lastIndexOf('.')));
  }
  // fileChange($event) {
  //   const image: any = new Image();
  //   const file: File = $event.target.files[0];
  //   this.fileName = file.name;
  //   this.fileType = file.type;
  //   const myReader: FileReader = new FileReader();
  //   const that = this;
  //   myReader.onloadend = (loadEvent: any) => {
  //     image.src = loadEvent.target.result;
  //     that.cropper.setImage(image);
  //   };
  //   myReader.readAsDataURL(file);
  // }

  /**  
   * 将以base64的图片url数据转换为Blob  
   * @param urlData  
   *            用url方式表示的base64图片数据  
   */
  convertBase64UrlToBlob(urlData) {

    var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte  

    //处理异常,将ascii码小于0的转换为大于0  
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: this.fileType || "image/jpg" });
  }
}
