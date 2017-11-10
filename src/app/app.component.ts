import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './SERVICE/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from './SERVICE/local.storage';
import { NzMessageService } from 'ng-zorro-antd';
import { AppService, boosShopsParams, setBossShopParams } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userInfo;

  isBoss = false;
  boosShopsOptions = [];
  selectedOption;

  validateForm: FormGroup;
  isCollapsed = false;
  loading = false;
  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    this.loading = true;
    this.api.Post(this.validateForm.value, "ShopUserLogin").subscribe((res) => {
      this.loading = false;
      if (res.State == 0) {
        this.userInfo = { Guid: res.Value, Phone: this.validateForm.value.Phone };
        this.ls.setObject("USERINFO", this.userInfo);
        this._message.create('success', '登录成功!');

        let resTemp: any = res;

        if (resTemp.Extend == 1) {//1 确认为老板,老板获取门店
          this.isBoss = true;
          let params: boosShopsParams = new boosShopsParams();
          this.appService.getBossShops(params).subscribe(res => {
            if (res.State == 0) {
              this.boosShopsOptions = res.Value;
              this.selectedOption = this.boosShopsOptions[0].Id;

              this.ls.setObject("boosShopsOptions", {
                List: this.boosShopsOptions,
                Id: this.selectedOption,
                isBoss: this.isBoss
              });

              this.currentShopChange(this.selectedOption);
            }
          });
        } else {
          this.isBoss = false;
          this.router.navigateByUrl("/tableMgr");
        }
      }
    });
  }
  currentShopChange(shopId) {
    this.ls.setObject("boosShopsOptions", {
      List: this.boosShopsOptions,
      Id: shopId,
      isBoss: this.isBoss
    });
    let params: setBossShopParams = new setBossShopParams();
    params.ShopID = shopId;
    this.appService.setBossShop(params).subscribe(res => {
      if (res.State == 0) {
        this.router.navigateByUrl("/tableMgr");
      }
    });
  }
  loginOut() {
    this.ls.setObject("USERINFO", {});
    this.ls.setObject("boosShopsOptions", {});

    window.location.reload();
  }
  constructor(private fb: FormBuilder, private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage,
    private _message: NzMessageService,
    private appService: AppService) {
    if (this.ls.getObject("USERINFO").Guid) {
      this.userInfo = this.ls.getObject("USERINFO");
      this._message.create('success', 'welcome to ng-zorro-cms ');
    } else {
      this._message.info('请先登录！');
    }
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      Phone: ['', [Validators.required]],
      Pwd: ['', [Validators.required]]
    });


    let boosShopsOptions = this.ls.getObject("boosShopsOptions");
    if (boosShopsOptions) {
      this.boosShopsOptions = boosShopsOptions.List;
      this.selectedOption = boosShopsOptions.Id;
      this.isBoss = boosShopsOptions.isBoss;
    }
  }
}



