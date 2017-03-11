import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { AppData, Profile, Account, ApiServer  } from '../../providers/app-data';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  account: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public appDataService: AppData,
    public profileClass: Profile,
    public accountClass: Account,
    public serverClass: ApiServer) {
    this.appDataService.initializeApplication();
    this.account = this.appDataService.account;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    if (this.appDataService.account.isActivated == false) {
      this.activateFirst();
    }
  }

  activateFirst() {
    let activate = this.alertCtrl.create({
      title: 'Activation Required!',
      message: 'Please verify your profile and sign in to activate.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('configure account ..');
            this.navCtrl.push(ProfilePage);
          }
        }
      ]
    });
    activate.present();
  }
}
