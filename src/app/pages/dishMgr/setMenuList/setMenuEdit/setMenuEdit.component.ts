import { Component, OnInit } from '@angular/core';
import { UnitListParams, TypeListParams, FlavorListParams, KitchenListParams, DishMgrService, EditSetMenuParams, SetMenuListParams, DishByNameParams } from '../../dishMgr.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
import { LocalStorage } from '../../../../SERVICE/local.storage';
@Component({
  selector: 'app-setMenuEdit',
  templateUrl: './setMenuEdit.component.html',
  styleUrls: ['./setMenuEdit.component.css']
})
export class SetMenuEditComponent implements OnInit {
  //单位
  _unitList = [];
  //类型
  _typeList = [];
  //查询菜单
  _searchDishOptions = [];
  //后厨
  _kitchenList = [];

  selectedOption;
  selectedOptionDish;

  imgUrl;

  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage,
    private service: DishMgrService) {

  }

  ngOnInit() {
    this.getUnitList();
    this.getTypeList();
    this.getKitchenList();
    this.searchChange("");
    let dishbehaviorObj = this.ls.getObject("setmenubehavior");
    if (dishbehaviorObj.MenuName) {
      dishbehaviorObj.MenuName = "";
      dishbehaviorObj.MenuPrice = "";
      dishbehaviorObj.Id = 0;
      dishbehaviorObj.MenuId = "";
      this.validateForm = this.fb.group(dishbehaviorObj);
      this.selectedOption = parseInt(dishbehaviorObj.CompanyId);
    } else {
      this.validateForm = this.fb.group(new EditSetMenuParams());
    }
    let id = this.routerInfo.snapshot.params["id"];
    if (id != "0") {
      let listParams: SetMenuListParams = new SetMenuListParams();
      listParams.Id = id;
      this.service.getSetMenuList(listParams).subscribe(res => {
        if (res.State == 0) {
          let data = res.Value[0];
          let editInfo = new EditSetMenuParams();
          editInfo.Id = data.Id;
          editInfo.CompanyId = data.CompanyId;
          editInfo.MenuId = data.MenuId;
          editInfo.MenuPeople = data.MenuPeople;
          editInfo.KitchenId = data.KitchenId;
          editInfo.MenuName = data.MenuName;
          editInfo.MenuPrice = data.MenuPrice;
          editInfo.TypeId = data.TypeId;

          this.validateForm = this.fb.group(editInfo);

          this.selectedOption = parseInt(data.CompanyId);
          let menuIds: any[] = data.MenuId.split(',');
          for (var index = 0; index < menuIds.length; index++) {
            menuIds[index] = parseInt(menuIds[index]);
          }
          this.selectedOptionDish = menuIds;
          
          this.imgUrl = data.MenuImage;
          console.log(this.validateForm.value);
        }
      });
    }
  }
  searchChange(searchText) {
    let params: DishByNameParams = new DishByNameParams();
    params.MenuName = searchText;
    this.service.searchDishByName(params).subscribe(res => {
      if (res.State == 0 && res.Value) {
        this._searchDishOptions = res.Value;
      }
    });
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

    this.ls.setObject("setmenubehavior", params);

    this.service.editSetMenu(params, this.file).subscribe(res => {
      if (res.State == 0) {
        swal(res.Msg, {
          icon: `success`,
          timer: 1000,
        });
        this.router.navigateByUrl('/dishMgr/setMenuList');
      }
    });
  }
  cancel() {
    this.router.navigateByUrl('/dishMgr/setMenuList');
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
  getKitchenList() {
    let params: KitchenListParams = new KitchenListParams();
    params.PageSize = 9999;
    this.service.getKitchenList(params).subscribe(res => {
      if (res.State == 0) {
        this._kitchenList = res.Value;
      }
    });
  }
  file: File[];
  fileChange($event) {
    this.file = $event.target.files;
    let filename = this.file[0].name;
    this.validateForm.controls.MenuName.setValue(filename.substring(0, filename.lastIndexOf('.')));
  }
}
