import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
import { ShopMgrService, JursByIdParams, EditJursByIdParams } from '../../shopMgr.service';
import { UnitService } from '../../../../SERVICE/unit.service';
@Component({
  selector: 'app-authEdit',
  templateUrl: './authEdit.component.html',
  styleUrls: ['./authEdit.component.css']
})
export class AuthEditComponent implements OnInit {

  validateForm: FormGroup;

  selectedOption;

  //权限列表
  _jursList = [];

  constructor(private fb: FormBuilder,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private service: ShopMgrService,
    private unitService:UnitService
  ) { }

  ngOnInit() {
    this.getJursList();
    let id = this.routerInfo.snapshot.params["id"];
    this.validateForm = this.fb.group({
      "Id": 0,
      "RoleName": "",
      "ShopId": "",
      "JuIds": ""
    });
    if (id != "0") {
      let params: JursByIdParams = new JursByIdParams();
      params.RoleId = id;
      this.service.getJursById(params).subscribe(res => {
        if (res.State == 0) {
          let data = res.Value[0];

          this.validateForm = this.fb.group(data);

          this.selectedOption = this.unitService.arrayChangeToInt(data.JuIds);

        }
      });
    }
  }
  getJursList() {
    this.service.getJursList().subscribe(res => {
      if (res.State == 0) {
        this._jursList = res.Value;
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
    let paramstrue: EditJursByIdParams = new EditJursByIdParams();
    paramstrue.JurisID = params.JuIds;
    paramstrue.RoleID = params.Id;

    this.service.editJurs(paramstrue).subscribe(res => {
      if (res.State == 0) {
        swal(res.Msg, {
          icon: `success`, timer: 1000,
        });
        this.router.navigateByUrl('/shopMgr/auth');
      }
    });

  }
  cancel() {
    this.router.navigateByUrl('/shopMgr/auth');
  }
}
