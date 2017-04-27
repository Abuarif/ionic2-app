import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';
import { Geolocation } from 'ionic-native';
// import { ProfilePage } from '../profile/profile';
import { ServerData } from '../../providers/server-data';
import { AppProfile } from '../../providers/app-profile';
import { SignUpPage } from '../sign-up/sign-up';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage {
  @ViewChild('map') mapElement: ElementRef;

  map: any;
  loading: Loading;

  mapInitialised: boolean = false;
  apiKey: any = 'AIzaSyA8BxZKXjS4z7yFRvTDBzBbt0V9x7I17Ug';
  latLng: any;
  lat: number;
  long: number;

  name: string;
  staffNumber: number;
  email: string;
  department: string;
  baseLocation: string;
  key: string;
  user_id: string;
  isActivated: boolean;
  isCheckedIn: boolean;

  message: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    // public appDataService: AppData,
    public appProfileService: AppProfile,
    public connectivityService: ConnectivityService,
    public loadingCtrl: LoadingController,
    public serverDataService: ServerData
  ) {

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

    if (this.isActivated == null || !this.isActivated ) {
      this.activateFirst();
    }

    this.loadGoogleMaps();
  }

  ionViewOnLoad() {
    console.log('ionViewWillEnter');
    if (this.isActivated == null || !this.isActivated ) {
    // if (this.appProfileService.isActivated == null || !this.appProfileService.isActivated || this.appProfileService.name == null) {
      this.activateFirst();
    }
  }

  activateFirst() {
    let activate = this.alertCtrl.create({
      title: 'Activation Required!',
      message: 'Please verify your profile and sign in to activate.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('configure account ..');
            this.navCtrl.push(SignUpPage);
          }
        }
      ]
    });
    activate.present();
  }

  loadGoogleMaps() {
    // this.debug('loadGoogleMaps');
    this.addConnectivityListeners();

    if (typeof google == "undefined" || typeof google.maps == "undefined") {

      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if (this.connectivityService.isOnline()) {
        console.log("online, loading map");

        //Load the SDK
        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          console.log("API Key is available!");
        } else {
          script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);

      }
    } else {

      if (this.connectivityService.isOnline()) {
        console.log("showing map");
        this.initMap();
        this.enableMap();
      }
      else {
        console.log("disabling map");
        this.disableMap();
      }
    }
  }

  loadScript() {
    let script = document.createElement("script");
    script.id = "googleMaps";

    if (this.apiKey) {
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
      console.log("API Key is available!");
    } else {
      script.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap';
    }

    document.body.appendChild(script);
  }

  initMap() {
    this.presentLoading();

    Geolocation.getCurrentPosition().then((position) => {
      this.mapInitialised = true;

      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;

      let mapOptions = {
        center: this.latLng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();

    }, (error) => {
      this.mapInitialised = false;
      console.log('Check GPS');
      this.enableGPS();
    });
  }

  enableGPS() {
    let alert = this.alertCtrl.create({
      title: 'GPS not available!',
      subTitle: 'Please enable your GPS.',
      buttons: ['OK']
    });
    alert.present();
  }

  disableMap() {
    console.log("disable map");
  }

  enableMap() {
    console.log("enable map");
  }

  addConnectivityListeners() {

    let onOnline = () => {

      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {

          this.loadGoogleMaps();

        } else {

          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }
      }, 1000);

    };

    let onOffline = () => {
      this.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);

  }

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>You are here!</h4>"
      + "<br/>Latitude: " + this.lat
      + "<br/>Longitude: " + this.long;

    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Use this location?',
      message: 'Do you agree to use this location for your attendance?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked ' + this.latLng);
            let message = 'Your location is at: '
              + '<br/> Lat: ' + this.lat
              + '<br/> Long: ' + this.long;
            this.debug(message);
          }
        }
      ]
    });
    confirm.present();
  }

  debug(message) {
    let alert = this.alertCtrl.create({
      title: 'Information',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoading() {
    this.loadingCtrl.create({
      content: 'Loading ...',
      duration: 3000,
      dismissOnPageChange: true
    }).present();
  }

  isAllowed() {
    if (this.mapInitialised && this.appProfileService.isActivated) {
      return true;
    } else {
      return false;
    }
  }

  canCheckIn() {
    let status: boolean = true;
    console.log('Can check in? ' + !this.appProfileService.isCheckedIn);
    if (!this.appProfileService.isCheckedIn) {
      status = true;
    } else {
      status = false;
    }
    // console.log('status: ' + status);
    console.log('isActivated: ' + this.appProfileService.isActivated);
    return status;
  }

  submitCheckInData() {
    let confirm = this.alertCtrl.create({
      title: 'Use this location?',
      message: 'Do you agree to use this location for your check in?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked ' + this.latLng);
            // this.account.isCheckedIn = true;
            this.submitTags(1);
          }
        }
      ]
    });
    confirm.present();

  }

  canCheckOut() {
    let status: boolean = true;
    console.log('Can check out?: ' + this.appProfileService.isCheckedIn);
    if (this.appProfileService.isCheckedIn) {
      status = true;
    } else {
      status = false;
    }
    return status;
  }

  submitCheckOutData() {
    // this.account = this.appDataService.getAccount();
    // this.account.isCheckedIn = true;
    let confirm = this.alertCtrl.create({
      title: 'Use this location?',
      message: 'Do you agree to use this location?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked ' + this.latLng);
            // this.account.isCheckedIn = false;
            // if (this.account.isCheckedIn) {
            //   this.account.isCheckedIn = false;
            // }
            this.submitTags(2);
          }
        }
      ]
    });
    confirm.present();
  }

  submitTags(direction: number) {
    this.showLoading()
    this.serverDataService.submitTags(direction, this.lat, this.long)
    .subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
            this.loading.dismiss();
          });
        } else {
          this.showError("Server is not accessible. Try again!");
        }
      },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Server Notification',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
