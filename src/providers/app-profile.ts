import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class AppProfile {
  name: string;
  staffNumber: number;
  email: string;
  department: string;
  baseLocation: string;
  key: string;
  user_id: string;
  isActivated: boolean;
  isCheckedIn: boolean;
  serverUrl:string;

  storage: Storage;

  constructor() {
    this.storage = new Storage();

    this.name = '';
    this.staffNumber = 0;
    this.email = '';
    this.department = '';
    this.baseLocation = '';
    this.key = 'empty';
    this.user_id = 'empty';
    this.isActivated = false;
    this.isCheckedIn = false;
    this.serverUrl = '';

    this.getAppProfile();
  }

  public getAppProfile() {
    this.storage.ready().then(() => {

      // Or to get a key/value pair
      this.storage.get('name').then((val) => {
        this.name = val;
      });
      this.storage.get('staffNumber').then((val) => {
        this.staffNumber = val;
      });
      this.storage.get('email').then((val) => {
        this.email = val;
      });
      this.storage.get('department').then((val) => {
        this.department = val;
      });
      this.storage.get('baseLocation').then((val) => {
        this.baseLocation = val;
      });
      this.storage.get('key').then((val) => {
        this.key = val;
      });
      this.storage.get('user_id').then((val) => {
        this.user_id = val;
      });
      this.storage.get('isActivated').then((val) => {
        this.isActivated = val;
      });
      this.storage.get('isCheckedIn').then((val) => {
        this.isCheckedIn = val;
      });
      this.storage.get('serverUrl').then((val) => {
        this.serverUrl = val;
      });

    });
  }

  public setAppProfile(key, data) {
    this.storage.ready().then(() => {
      // set a key/value
      this.storage.set(key, data);
      this.getAppProfile();
     });
  }

  public clear() {
    this.storage.clear();
  }

}
