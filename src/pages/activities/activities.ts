import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { AppData } from '../../providers/app-data';
import { AppProfile } from '../../providers/app-profile';
import { ServerData } from '../../providers/server-data';
import { AlertController, LoadingController, Loading } from 'ionic-angular';

/*
  Generated class for the Activities page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html'
})
export class ActivitiesPage {
  public services: any = [];
  limit: any = 5;
  loading: Loading;
  credentials = { key: '', limit: '' };
  public account: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public serverDataService: ServerData,
    // public appDataService: AppData,
    public appProfileService: AppProfile,
    private loadingCtrl: LoadingController

  ) { }

  public loadTags() {
    this.showLoading()
    this.serverDataService.getTags(this.limit)
      .subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
            this.loading.dismiss();
            this.services = this.serverDataService.activities;
          });
        } else {
          this.showError("Server is not accessible. Try again!");
        }
      },
      error => {
        this.showError(error);
      });
  }

  changeLimit() {
    this.loadTags();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivitiesPage');
    this.loadTags();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Server Notification',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }


}
