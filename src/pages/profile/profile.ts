import { Component } from '@angular/core';
import { AppData } from '../../providers/app-data';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class User {
  name: string;
  staffNumber: number;
  email: string;
  userId: number;
  department: any;
  baseLocation: any;

  constructor(name, staffNumber, email, department, baseLocation) {
    this.name = name;
    this.staffNumber = staffNumber;
    this.email = email;
    this.department = department;
    this.baseLocation = baseLocation;
  }
}

export class Account {
  key: any;
  isCheckedIn: any;
  isActivated: any;

  constructor() {
    this.key = '';
    this.isActivated = false;
    this.isCheckedIn = false;
  }
}

export class Server {
  url: any;

  constructor(url) {
    this.url = url;
  }
}

export class ProfilePage {

  profile: User;
  account: Account;
  server: Server;

  constructor(public appDataService: AppData) {
    this.initializaProfile();
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

  initializaProfile() {
    this.appDataService.getData('profile')
      .then((profile) => {
        if (profile) {
          this.profile = JSON.parse(profile);
        } else {
          this.profile = new User('Suhaimi Maidin', '10010060', 'suhaimi.maidin@prasarana.com.my', 'ICT', 'Subang');
        }
      });

    this.appDataService.getData('account')
      .then((account) => {
        if (account) {
          this.account = JSON.parse(account);
        } else {
          this.account = new Account();
        }
      });

    this.appDataService.getData('server')
      .then((server) => {
        if (server) {
          this.server = JSON.parse(server);
        } else {
          this.server = new Server('https://mtas.prasarana.com.my');
        }
      });
  }


}

