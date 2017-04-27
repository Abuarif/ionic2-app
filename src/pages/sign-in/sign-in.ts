import { Component } from '@angular/core';
import { NavController, Nav, AlertController, LoadingController, Loading } from 'ionic-angular';
import { ServerData } from '../../providers/server-data';
import { AppData } from '../../providers/app-data';
import { AppProfile } from '../../providers/app-profile';
import { TabsPage } from '../tabs/tabs';

/*
  Generated class for the SignIn page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignInPage {
  // credentials: any;
  loading: Loading;
  credentials = { email: '', password: '' };


  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public serverDataService: ServerData,
    public appDataService: AppData,
    public appProfileService: AppProfile,
    private nav: Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }
  setInput() {
    this.credentials.email = this.appProfileService.email;
  }

  public login() {
    this.showLoading()
    this.serverDataService.login(this.credentials)
      .subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
            this.loading.dismiss();
            this.navCtrl.setRoot(TabsPage);
          }, 3000);
        } else {
          this.showError("Server is not accessible. Try again!");
        }
      },
      error => {
        this.showError(error);
      });
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

  cancelSignIn() {
    this.nav.setRoot(TabsPage);
  }
}
