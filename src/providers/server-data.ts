import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
// import { AppData } from './app-data';
import { AppProfile } from './app-profile';

@Injectable()
export class ServerData {
  attendances: any;
  public authUrl: string = '/api/auth.json';
  public signUpUrl: string = '/api/signup.json';
  public tagUrl: string = '/api/activity.json';
  public logUrl: string = '/api/log.json';
  public departmentUrl: string = '/api/department.json';
  public locationUrl: string = '/api/location.json';
  public activities = [];

  opt: RequestOptions;
  myHeaders: Headers = new Headers;


  public apiServer: { log: string, auth: string, tag: string, department: string, location: string, signup: string };

  name: string;
  staffNumber: number;
  email: string;
  department: string;
  baseLocation: string;
  key: string;
  user_id: string;
  isActivated: boolean;
  isCheckedIn: boolean;
  serverUrl: string = 'https://mtas.prasarana.com.my';

  submitted: boolean;

  constructor(
    public http: Http,
    private alertCtrl: AlertController,
    // public appDataService: AppData,
    private appProfileService: AppProfile) {
    console.log('Hello ServerData Provider');
    this.apiServer = { log: this.logUrl, auth: this.authUrl, tag: this.tagUrl, department: this.departmentUrl, location: this.locationUrl, signup: this.signUpUrl };

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
    // this.serverUrl = this.appProfileService.serverUrl;

    console.log('Server URL: ' + this.serverUrl);

    this.myHeaders.set('Content-type', 'application/json');
    this.myHeaders.set("Access-Control-Allow-Origin", "*");
    this.myHeaders.set("Access-Control-Allow-Credentials", "true");
    this.myHeaders.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    this.myHeaders.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    // this.myHeaders.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let targetPath = this.authUrl
          + '?username=' + credentials.email
          // + '?username=' + credentials.email.split('@')[0]
          + '&password=' + credentials.password;
        // At this point make a request to your backend to make a real check!
        this.getServerData(targetPath);
        // this.postServerData(targetPath, credentials);
        let access = false;
        console.log('Activation: ' + this.appProfileService.isActivated);
        if (this.appProfileService.isActivated) access = true;
        observer.next(access);
        observer.complete();
      });
    }
  }

  getServerData(targetPath) {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    this.http.get(this.serverUrl + targetPath, this.opt)
      .subscribe(res => {
        let data = res.json();
        console.log('data: ' + data.user_id);
        this.appProfileService.setAppProfile('user_id', data.user_id);
        this.appProfileService.setAppProfile('key', data.key);
        this.appProfileService.setAppProfile('isActivated', true);
      }, (err) => {
        console.log(err);
      });
  }


  public getTags(limit) {

    return Observable.create(observer => {
      let targetPath = this.apiServer.tag
        + '?key=' + this.appProfileService.key
        + '&limit=' + limit;
      // At this point make a request to your backend to make a real check!
      this.getServerActivity(targetPath);
      // this.postServerData(targetPath, credentials);
      let access = false;
      if (this.activities.length > 0) access = true;
      observer.next(access);
      observer.complete();
    });

  }

  getServerActivity(targetPath) {

    this.opt = new RequestOptions({
      headers: this.myHeaders
    });
    let path = this.serverUrl + targetPath;
    console.log('Path: ' + path);
    this.http.get(this.serverUrl + targetPath, this.opt)
    // this.http.get(path, this.opt)
      .subscribe(res => {
        this.activities = res.json();
        console.log(this.activities);
      }, (err) => {
        console.log('Error: ' + err);
      });
  }

  

  public submitTags(direction: number, lat: number, long: number) {

    return Observable.create(observer => {
      this.submitTag(direction, lat, long)
      observer.next(this.submitted);
      observer.complete();
    });

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

  public submitTag(direction: number, lat: number, long: number) {
    let apiServerPath = this.serverUrl+ this.apiServer.log
      + '?direction=' + direction
      + '&lat=' + lat
      + '&long=' + long
      + '&user_id=' + this.appProfileService.user_id;
    console.log('Server: ' + apiServerPath);
    this.http.get(apiServerPath, this.opt)
      .subscribe(res => {
        let data = res.json();
        console.log('response:' + data.result);
        console.log('direction:' + direction);

        if (data.result == 1 && direction == 1) {
          this.appProfileService.setAppProfile('isCheckedIn', true);
          this.submitted = true;
        } else if (data.result == 1 && direction == 2) {
          this.appProfileService.setAppProfile('isCheckedIn', false);
          this.submitted = true;
        }
        console.log('after submitTag:' + this.appProfileService.isCheckedIn);
      }, (err) => {
        console.log(err);
      });
  }

  public loadTag(limit: number) {
    let targetPath = this.apiServer.tag
      + '?key=' + this.appProfileService.key
      + '&limit=' + limit;
    let path = this.serverUrl + targetPath;
    console.log('Path: ' + path);

    this.http.get(path)
      .subscribe(res => {
        this.activities = res.json();
      }, (err) => {
        console.log(err);
      });
  }

}
