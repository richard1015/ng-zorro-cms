import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './SERVICE/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from './SERVICE/local.storage';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  validateForm: FormGroup;
  isCollapsed = false;
  loading=false;
  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    this.loading=true;
    this.api.Post(this.validateForm.value, "ShopUserLogin").subscribe((res) => {
      this.loading=false;
      if (res.State == 0) {
        this.ls.setObject("USERINFO", { Guid: res.Value });
        this.router.navigateByUrl("/dishMgr");
      }
    });
  }

  constructor(private fb: FormBuilder, private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private ls: LocalStorage,
    private _message: NzMessageService) {
    if (this.ls.getObject("USERINFO").Guid) {
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
  }
}
