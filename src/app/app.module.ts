import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LopMonHocPage } from '../pages/lopmonhoc/lopmonhoc';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { PipeModule } from '../pipes/pipes'

import { AppData } from '../providers/app-data';
import { LoginPage } from '../pages/login/login';
import { LopMonHocDetailPage } from '../pages/lopmonhoc-detail/lopmonhoc-detail';
import { LichHocDetailPage } from '../pages/lichhoc-detail/lichhoc-detail';
import { LichPage } from '../pages/lich/lich';
import { StatPage } from '../pages/stat/stat';
import { ThongBaoPage } from '../pages/thongbao/thongbao';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    StatPage,
    LopMonHocPage,
    LopMonHocDetailPage,
    LichHocDetailPage,
    LichPage,
    ThongBaoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    PipeModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    StatPage,
    LopMonHocPage,
    LopMonHocDetailPage,
    LichHocDetailPage,
    LichPage,
    ThongBaoPage
  ],
  providers: [
    AppData,

    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
