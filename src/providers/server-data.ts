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
  public tagUrl: string = '/activity.json';
  public logUrl: string = '/log.json';
  public departmentUrl: string = '/department.json';
  public locationUrl: string = '/location.json';
  public host: string = 'https://mtas.prasarana.com.my';
  // public host: string = 'http://localhost/ict';
  public activities = [];

  public apiServer: { host: string, log: string, auth: string, tag: string, department: string, location: string, signup: string };

  name: string;
  staffNumber: number;
  email: string;
  department: string;
  baseLocation: string;
  key: string;
  user_id: string;
  isActivated: boolean;
  isCheckedIn: boolean;

  submitted: boolean;

  constructor(
    public http: Http,
    private alertCtrl: AlertController,
    // public appDataService: AppData,
    private appProfileService: AppProfile) {
    console.log('Hello ServerData Provider');
    this.apiServer = { host: this.host, log: this.logUrl, auth: this.authUrl, tag: this.tagUrl, department: this.departmentUrl, location: this.locationUrl, signup: this.signUpUrl };

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

  getServerActivity(targetPath) {
    let opt: RequestOptions
    let myHeaders: Headers = new Headers
    // myHeaders.set('Content-type', 'application/json');
    myHeaders.set("Access-Control-Allow-Origin", "*");
    // myHeaders.set("Access-Control-Allow-Credentials", "true");
    myHeaders.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // myHeaders.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    myHeaders.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
    opt = new RequestOptions({
      headers: myHeaders
    });
    let path = this.apiServer.host + targetPath;
    console.log('Path: ' + path);
    this.http.get(path, opt)
      .subscribe(res => {
        this.activities = res.json();
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
    let apiServerPath = this.apiServer.host + targetPath;
    console.log('Server: ' + apiServerPath);
    this.http.post(apiServerPath, data, opt)
      .subscribe(res => {
        console.log(res.json());
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
    this.http.get(this.apiServer.host + targetPath)
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

  public submitTag2(direction: number, lat: number, long: number) {

    if (direction === null || lat === null || long === null) {
      return Observable.throw("Please insert data");
    } else {
      return Observable.create(observer => {
        let data = { 'direction': direction, 'user_id': this.user_id, 'lat': lat, 'long': long };
        // At this point make a request to your backend to make a real check!
        this.postServerData(this.apiServer.log, data);
        observer.next(true);
        observer.complete();
      });
    }
  }

  public submitTag(direction: number, lat: number, long: number) {
    let apiServerPath = this.apiServer.host + this.apiServer.log
      + '?direction=' + direction
      + '&lat=' + lat
      + '&long=' + long
      + '&user_id=' + this.appProfileService.user_id;
    console.log('Server: ' + apiServerPath);
    this.http.get(apiServerPath)
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
    let path = this.apiServer.host + targetPath;
    console.log('Path: ' + path);

    this.http.get(path)
      .subscribe(res => {
        this.activities = res.json();
      }, (err) => {
        console.log(err);
      });
  }

}
