import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
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

  getServerData(targetPath, credentials) {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    targetPath = targetPath + '?username=' + credentials.email.split('@')[0]
      + '&password=' + credentials.password;
    this.http.get(this.appDataService.getServer().url + targetPath)
      .subscribe(res => {
        this.appDataService.setAccount(res.json());
      }, (err) => {
        console.log(err);
      });
  }

  postServerData(targetPath, data) {
    let opt: RequestOptions
    let myHeaders: Headers = new Headers
    myHeaders.set('Content-type', 'application/json')
    myHeaders.set("Access-Control-Allow-Origin", '*');
    myHeaders.set('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    myHeaders.set('Access-Control-Allow-Headers', 'Content-Type,Accept');
    opt = new RequestOptions({
      headers: myHeaders
    })

    data = JSON.stringify(data);
    console.log('Data: ' + data);
    this.http.post(this.appDataService.getServer().url + targetPath, data, opt)
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
        let targetPath = this.authUrl;

        // At this point make a request to your backend to make a real check!
        this.getServerData(targetPath, credentials);
        // this.postServerData(targetPath, credentials);
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
