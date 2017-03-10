import { Component } from '@angular/core';
import { AppData, Profile, Account, ApiServer } from '../../providers/app-data';

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
    public serverClass: ApiServer
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

  public getProfile() {
    return this.profile;
  }

  public setProfile(newProfile) {
    this.profile = newProfile;
    this.appDataService.save('profile', newProfile);
  }

  public getAccount() {
    return this.account;
  }

  public setAccount(newAccount) {
    this.account = newAccount;
    this.appDataService.save('account', newAccount);
  }

  public getServer() {
    return this.server;
  }

  public setServer(newServer) {
    this.server = newServer;
    this.appDataService.save('server', newServer);
  }

}

