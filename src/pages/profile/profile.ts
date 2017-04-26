import { Component } from '@angular/core';
import { NavController, AlertController, Nav } from 'ionic-angular';
import { ServerData } from '../../providers/server-data';
import { AppProfile } from '../../providers/app-profile';
import { SignUpPage } from '../sign-up/sign-up';
import { SignInPage } from '../sign-in/sign-in';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {

  name: string;
  staffNumber: number;
  email: string;
  department: string;
  baseLocation: string;
  key: string;
  user_id: string;
  isActivated: boolean;
  isCheckedIn: boolean;
  serverUrl: string;

  constructor(
    public serverDataService: ServerData,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public appProfileService: AppProfile,
    private nav: Nav
  ) {

    this.appProfileService.getAppProfile();

    this.name = this.appProfileService.name;
    this.staffNumber = this.appProfileService.staffNumber;
    this.email = this.appProfileService.email;
    this.department = this.appProfileService.department;
    this.baseLocation = this.appProfileService.baseLocation;
    this.key = this.appProfileService.key;
    this.user_id = this.appProfileService.user_id;
    this.isActivated = this.appProfileService.isActivated;
    this.isCheckedIn = this.appProfileService.isCheckedIn;
    this.serverUrl = this.appProfileService.serverUrl;
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
            this.appProfileService.isActivated = false;
            this.navCtrl.push(SignUpPage);
          }
        }
      ]
    });
    confirm.present();
  }

  clear() {
    let confirm = this.alertCtrl.create({
      title: 'Clear All Data',
      message: 'Are you sure you want to proceed? This action will remove all data in this app.',
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
            this.appProfileService.clear();
            this.nav.setRoot(SignUpPage);
          }
        }
      ]
    });
    confirm.present();
  }

}

