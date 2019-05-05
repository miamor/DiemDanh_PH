import { Component, ViewChild } from '@angular/core';

import { AlertController, App, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher, NavParams } from 'ionic-angular';

import { AppData } from '../../providers/app-data';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-thongbao',
    templateUrl: 'thongbao.html'
})
export class ThongBaoPage {
    dataList: any;
    shownData = 0;
    userID: any;

    oldNoti: any;
    noti: any;

    constructor(
        public alertCtrl: AlertController,
        public app: App,
        public loadingCtrl: LoadingController,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,

        public storage: Storage,
        public appData: AppData
    ) {
        this.appData.getUserInfoPromise().then((data) => {
            this.userID = data['MaSV'];
            this.updateList(this.userID);
        });
    }

    updateList(userID) {
        // Close any open sliding items when the tour updates
        this.dataList && this.dataList.closeSlidingItems();

        this.appData.listThongBaoByMaSV(userID).subscribe((data: any) => {
            console.log(data);

            this.noti = data;

            this.oldNoti = this.storage.get('noti');
            this.storage.set('noti', data);

            for (let i in this.noti) {
                this.shownData++;
                this.noti[i]['new'] = 0;
                if (!this.oldNoti[i] || this.oldNoti[i]['tongvang'] != this.noti[i]['tongvang']) {
                    this.noti[i]['new'] = 1
                }
            }
            console.log(this.shownData);
        });
    }

    doRefresh(refresher: Refresher) {
        this.appData.listThongBaoByMaSV(this.userID).subscribe((data: any) => {
            this.noti = data;

            this.oldNoti = this.storage.get('noti');
            this.storage.set('noti', data);

            for (let i in this.noti) {
                this.shownData++;
                this.noti[i]['new'] = 0;
                if (!this.oldNoti[i] || this.oldNoti[i]['tongvang'] != this.noti[i]['tongvang']) {
                    this.noti[i]['new'] = 1
                }
            }

            // simulate a network request that would take longer
            // than just pulling from out local json file
            setTimeout(() => {
                refresher.complete();

                const toast = this.toastCtrl.create({
                    message: 'List have been updated.',
                    duration: 3000
                });
                toast.present();
            }, 1000);
        });
    }

    goToDetail(oneData: any) {
        // go to the tour detail page
        // and pass in the tour data

        // this.navCtrl.push(LopMonHocDetailPage, { MaLMH: oneData.MaLMH, dataInfo: oneData, title: '['+oneData.MaLMH+'] '+oneData.TenMH });
    }
}
