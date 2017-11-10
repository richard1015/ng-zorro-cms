import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';

import { AppRoutes } from './app.routing';
import { UploadService } from './SERVICE/upload.service';
import { ApiService } from './SERVICE/api.service';
import { WebSocketService } from './SERVICE/webSocket.service';
import { LocalStorage } from './SERVICE/local.storage';
import { OpenShopComponent } from './openShop/openShop.component';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    OpenShopComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    AppRoutes
  ],
  providers: [
    UploadService,
    ApiService,
    WebSocketService,
    AppService,
    LocalStorage,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }