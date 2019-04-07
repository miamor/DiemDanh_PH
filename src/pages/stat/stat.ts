import { Component } from '@angular/core';

import { App, NavController, LoadingController, ToastController, Refresher, NavParams } from 'ionic-angular';

import { AppData } from '../../providers/app-data';

@Component({
    selector: 'page-stat',
    templateUrl: 'stat.html'
})
export class StatPage {
    userID: any;
    stat = {
        total_lmh: 0,
        total_lessons: 0,
        total_comat: 0,
        total_vp: 0,
        total_vkp: 0
    };

    constructor(
        public app: App,
        public loadingCtrl: LoadingController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,

        public appData: AppData
    ) {
        this.appData.getUserInfoPromise().then((data) => {
            this.userID = data['MaSV'];
            this.loadStat();
        });

    }

    ionViewDidLoad() {
        
    }

    loadStat() {
        this.appData.loadStat(this.userID).subscribe((dataList: any) => {
            this.stat = dataList;
            //console.log(dataList);
        });
    }


    doRefresh(refresher: Refresher) {
        this.appData.loadStat(this.userID).subscribe((dataList: any) => {
            this.stat = dataList;

            // simulate a network request that would take longer
            // than just pulling from out local json file
            setTimeout(() => {
                refresher.complete();

                const toast = this.toastCtrl.create({
                    message: 'Updated.',
                    duration: 3000
                });
                toast.present();
            }, 1000);
        });
    }

}
