import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AppData {
  public profile: { name: string, staffNumber: number, email: string, department: string, baseLocation: string };
  public account: { key: string, user_id: string, isActivated: boolean, isCheckedIn: boolean };
  storage: Storage;
  constructor() {
    this.storage = new Storage();
    this.profile = { name: '', staffNumber: 0, email: '', department: '', baseLocation: '' };
    this.account = { key: 'empty', user_id: 'empty', isActivated: false, isCheckedIn: false };

    // get profile from local storage is any
    this.getData('profile').then((profile) => {
      if (profile) {
        return JSON.parse(profile);
      } else {
        profile = {
          name: 'Suhaimi Maidin',
          staffNumber: 10010060,
          email: 'suhaimi.maidin@prasarana.com.my',
          department: 'ICT',
          baseLocation: 'Subang'
        };
      }
      return profile;
    }).then((data) => {
      this.profile = data;
    });

    // get account setting from local storage if any
    this.getData('account').then((account) => {
      if (account) {
        return JSON.parse(account);
      } else {
        account = {
          key: 'empty',
          user_id: 'empty',
          isActivated: false,
          isCheckedIn: false
        };
      }
      return account;
    }).then((data) => {
      this.account = data;
    });

  }


  resetStorage() {
    this.storage.clear();
  }
  getData(key) {
    return this.storage.get(key);
  }

  save(key, data) {
    console.log('Save: ' + key);
    console.log('Data: ' + data);
    let newData = JSON.stringify(data);
    this.storage.set(key, newData);
  }

  public getProfile() {
    return this.profile;
  }

  public setProfile(profile) {
    if (profile === null) {
      return Observable.throw("Please key in your name ...");
    } else {
      this.save('profile', profile);
      this.profile = profile;
    }
  }

  public getAccount() {
    return this.account;
  }

  public setAccount(account) {
    if (account === null) {
      return Observable.throw("Please key in your account data ...");
    } else {
      this.save('account', account);
      this.getData('account')
        .then((account) => {
          if (account) {
            this.account = JSON.parse(account);
          } else {
            this.account = {
              key: 'empty',
              user_id: 'empty',
              isActivated: false,
              isCheckedIn: false
            };

            console.log('isActivated: ' + this.account.isActivated);
          }
        }).catch((ex) => {
          console.error('Error fetching account', ex);
        });
    }
  }

  public updateAccount(data: { key: string, user_id: string, isActivated: boolean, isCheckedIn: boolean }) {
    console.log('Call update Account');
    // get local data.. then update on the variant
    this.getData('account')
      .then((account) => {
        if (account) {
          this.account = JSON.parse(account);
        } else {
          account = {
            key: 'empty',
            user_id: 'empty',
            isActivated: false,
            isCheckedIn: false
          };
        }
        // compare data
        if (data.isActivated === null) {
          console.log('update isActivated');
          account = {
            isActivated: data.isActivated
          };
        }
        if (data.isCheckedIn === null) {
          console.log('update isCheckedIn');
          account = {
            isCheckedIn: data.isCheckedIn
          };
        }
        if (data.key === null) {
          console.log('update key');
          account = {
            key: data.key
          };
        }
        if (data.user_id === null) {
          console.log('update user_id');
          account = {
            user_id: data.user_id
          };
        }
        // save account
        console.log('App data account: ' + account);
        this.save('account', account);
      }).catch((ex) => {
        console.error('Error fetching account', ex);
      });

  }

  public initializeApplication() {
    console.log('Initialize App Data');
    return Observable.create(observer => {
      let access = false;
      this.getData('profile')
        .then((profile) => {
          if (profile) {
            this.profile = JSON.parse(profile);
          } else {
            this.profile = {
              name: 'Suhaimi Maidin',
              staffNumber: 10010060,
              email: 'suhaimi.maidin@prasarana.com.my',
              department: 'ICT',
              baseLocation: 'Subang'
            };

            if (this.profile.name != '') {
              console.log('Name: ' + this.profile.name);
              access = true;
            }
          }
        }).catch((ex) => {
          console.error('Error fetching profile', ex);
        });

      this.getData('account')
        .then((account) => {
          if (account) {
            this.account = JSON.parse(account);
          } else {
            this.account = {
              key: 'empty',
              user_id: 'empty',
              isActivated: false,
              isCheckedIn: false
            };

            console.log('isActivated: ' + this.account.isActivated);
          }
        }).catch((ex) => {
          console.error('Error fetching account', ex);
        });

      observer.next(access);
      observer.complete();
    });
  }

}