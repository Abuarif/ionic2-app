import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AppData, Profile, Account, ApiServer } from '../../providers/app-data';
import { SignUpPage } from '../sign-up/sign-up';
import { SignInPage } from '../sign-in/sign-in';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {

  profile: any;
  account: any;
  server: any;

  constructor(
    public appDataService: AppData,
    public profileClass: Profile,
    public accountClass: Account,
    public serverClass: ApiServer,
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {
    this.appDataService.initializeApplication();
    this.profile = this.appDataService.profile;
    this.account = this.appDataService.account;
    this.server = this.appDataService.server;

    console.log('Profile: ' + this.profile);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  signIn() {
    this.navCtrl.push(SignInPage);
  }

  signUp() {
    let confirm = this.alertCtrl.create({
      title: 'Sign Up',
      message: 'Are you sure you want to proceed? This action will remove the curret profile.',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked ');
            this.appDataService.account.isActivated = false;
            this.navCtrl.push(SignUpPage);
          }
        }
      ]
    });
    confirm.present();
  }



}

