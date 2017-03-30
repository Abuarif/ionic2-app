import { Component } from '@angular/core';
import { NavController, Nav, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AppData } from '../../providers/app-data';
import { AppProfile } from '../../providers/app-profile';
import { ServerData } from '../../providers/server-data';
import { SignInPage } from '../sign-in/sign-in';
import { TabsPage } from '../tabs/tabs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  name: string;
  staffNumber: number;
  email: string;
  department: string;
  baseLocation: string;
  key: string;
  user_id: string;
  isActivated: boolean;
  isCheckedIn: boolean;

  createSuccess: any = false;

  constructor(
    public http: Http,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public appDataService: AppData,
    public appProfileService: AppProfile,
    public serverDataService: ServerData,
    private nav: Nav
  ) {
    // get profile from local storage is any
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

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  goToRoot() {
    this.navCtrl.popToRoot();
  }

  cancelSignUp() {
    this.nav.setRoot(TabsPage);
  }

  resetForm() {
    // to be implemented 
  }
  public register() {
    this.appProfileService.setAppProfile('name', this.name);
    this.appProfileService.setAppProfile('staffNumber', this.staffNumber);
    this.appProfileService.setAppProfile('email', this.email);
    this.appProfileService.setAppProfile('isActivated', false);
    console.log('new profile: ' + this.name);
    if (this.name != '') {
      this.nav.setRoot(SignInPage);
    };
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.push(SignInPage);
            }
          }
        }
      ]
    });
    alert.present();
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Server Notification',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }


}
