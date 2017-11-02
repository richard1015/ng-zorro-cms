import { Component, OnInit } from '@angular/core';
import { EditStaffParams, ShopMgrService, StaffListParams, AuthListParams } from '../../shopMgr.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
import { KitchenListParams, DishMgrService } from '../../../dishMgr/dishMgr.service';
@Component({
  selector: 'app-staffEdit',
  templateUrl: './staffEdit.component.html',
  styleUrls: ['./staffEdit.component.css']
})
export class StaffEditComponent implements OnInit {

  //后厨
  _kitchenList = [];
  //所有角色
  _authList = [];

  selectedOption;
  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private service: ShopMgrService,
    private serviceDish: DishMgrService,
  ) { }

  ngOnInit() {
    this.getKitchenList();
    this.getAuthList();
    this.validateForm = this.fb.group(new EditStaffParams());
    let id = this.routerInfo.snapshot.params["id"];
    if (id != "0") {
      let editStaff: StaffListParams = new StaffListParams();
      editStaff.Id = id;
      this.service.getStaffList(editStaff).subscribe(res => {
        if (res.State == 0) {
          let data = res.Value[0];
          let editInfo = new EditStaffParams();
          editInfo.Id = data.Id;
          editInfo.JobName = data.JobName;
          editInfo.JobNumber = data.JobNumber;
          editInfo.KitchenId = data.KitchenId;
          editInfo.Phone = data.Phone;
          editInfo.Pwd = data.Pwd;
          editInfo.RoleID = data.RoleID;

          this.validateForm = this.fb.group(editInfo);

          this.selectedOption = parseInt(data.RoleID);
          console.log(this.validateForm.value);
        }
      });
    }
  }
  getKitchenList() {
    let params: KitchenListParams = new KitchenListParams();
    params.PageSize = 9999;
    this.serviceDish.getKitchenList(params).subscribe(res => {
      if (res.State == 0) {
        this._kitchenList = res.Value;
      }
    });
  }
  getAuthList() {
    let params: AuthListParams = new AuthListParams();
    params.PageSize = 9999;
    this.service.getAuthList(params).subscribe(res => {
      if (res.State == 0) {
        this._authList = res.Value;
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

    this.service.editStaff(params).subscribe(res => {
      if (res.State == 0) {
        swal(res.Msg, {
          icon: `success`,
        });
        this.router.navigateByUrl('/shopMgr/staff');
      }
    });

  }
  cancel() {
    window.history.back();
  }
}
