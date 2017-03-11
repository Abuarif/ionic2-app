import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AppData } from '../../providers/app-data';
import { SignInPage } from '../sign-in/sign-in';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  profile = {
    name: '',
    staffNumber: '',
    email: '',
    department: '',
    baseLocation: '',
  };
  depts = ['ICT', 'Dept 2', 'Dept 3'];
  baseLocations = ['Subang', 'Bangsar', 'Cheras Selatan'];
  createSuccess: any = false;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public appDataService: AppData
    ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  goToRoot() {
    this.navCtrl.popToRoot();
  }

  resetForm() {
    // to be implemented 
  }
  public register() {
    this.appDataService.setProfile(this.profile)
    .subscribe(success => {
        if (success) {
          this.createSuccess = true;
          // this.showPopup("Success", "Account created.");
          this.appDataService.account.isActivated = false;
          this.navCtrl.push(SignInPage);
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
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

}
