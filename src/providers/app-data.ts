import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export class Profile {
  name: string;
  staffNumber: number;
  email: string;
  userId: number;
  department: any;
  baseLocation: any;

  public init(name, staffNumber, email, department, baseLocation) {
    // this.name = name;
    // this.staffNumber = staffNumber;
    // this.email = email;
    // this.department = department;
    // this.baseLocation = baseLocation;

    return { name: name, staffNumber: staffNumber, email: email, department: department, baseLocation: baseLocation };
    // return Profile;
  }
}

export class Account {
  key: any;
  isCheckedIn: any;
  isActivated: any;

  public init() {
    this.key = '';
    this.isActivated = false;
    this.isCheckedIn = false;
    console.log('isActivated:' + this.isActivated);
    return { key: this.key, isActivated: this.isActivated, isCheckedIn: this.isCheckedIn };
    // return Account;
  }
}

export class ApiServer {
  url: any;

  public init(url) {
    // this.url = url;
    // return ApiServer;
    return { url: url };
  }
}

@Injectable()
export class AppData {
  profile: any;
  account: any;
  server: any;

  constructor(
    public storage: Storage,
    public profileClass: Profile,
    public accountClass: Account,
    public apiServerClass: ApiServer) {

  }

  getData(key) {
    return this.storage.get(key);
  }

  save(key, data) {
    let newData = JSON.stringify(data);
    this.storage.set(key, newData);
  }

  public initializeApplication() {
    this.getData('profile')
      .then((profile) => {
        if (profile) {
          this.profile = JSON.parse(profile);
        } else {
          this.profile = this.profileClass.init('Suhaimi Maidin', '10010060', 'suhaimi.maidin@prasarana.com.my', 'ICT', 'Subang');
        }
      });

    this.getData('account')
      .then((account) => {
        if (account) {
          this.account = JSON.parse(account);
        } else {
          this.account = this.accountClass.init();
        }
      });

    this.getData('server')
      .then((server) => {
        if (server) {
          this.server = JSON.parse(server);
        } else {
          this.server = this.apiServerClass.init('https://mtas.prasarana.com.my');
        }
      });
  }

  public getProfile() {
    return this.profile;
  }

  public setProfile(newProfile) {
    if (newProfile === null) {
      return Observable.throw("Please key in your name ...");
    } else {
      this.profile = newProfile;
      this.save('profile', newProfile);
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getAccount() {
    return this.account;
  }

  public setAccount(newAccount) {
    if (newAccount === null) {
      return Observable.throw("Please key in your account data ...");
    } else {
      this.account = newAccount;
      this.save('account', newAccount);
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getServer() {
    return this.server;
  }

  public setServer(newServer) {
    if (newServer === null) {
      return Observable.throw("Please key in your url ...");
    } else {
      this.server = newServer;
      this.save('server', newServer);
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
}