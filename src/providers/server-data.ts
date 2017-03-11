import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AppData } from './app-data';

@Injectable()
export class ServerData {
  attendances: any;
  authUrl: string = '/web_login.json';
  activityUrl: string = '/activity.json';
  logUrl: string = '/log.json';

  constructor(
    public http: Http,
    private alertCtrl: AlertController,
    public appDataService: AppData) {
    console.log('Hello ServerData Provider');
  }

  requestServerData(targetPath) {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    this.http.get(this.appDataService.getServer().url + targetPath)
      .subscribe(res => {
        this.appDataService.setAccount(res.json());
      }, (err) => {
        console.log(err);
      });
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let targetPath = this.authUrl
          + '?username=' + credentials.email.split('@')[0]
          + '&password=' + credentials.password;
        // At this point make a request to your backend to make a real check!
        this.requestServerData(targetPath);
        let access = false;
        console.log('Activation: ' + this.appDataService.account.isActivated);
        if (this.appDataService.account.isActivated) access = true;
        observer.next(access);
        observer.complete();
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
}
