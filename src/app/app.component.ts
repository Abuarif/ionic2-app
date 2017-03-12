import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { TabStatsPage } from '../pages/tabs/tabs.stats';

import { ProfilePage } from '../pages/profile/profile';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';

import { PersonalStatsPage } from '../pages/personal-stats/personal-stats';

import { AppData } from '../providers/app-data';
import { ServerData } from '../providers/server-data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = TabsPage;
  operations: Array<{ title: string, component: any, icon: any }>;
  pages: Array<{ title: string, component: any, icon: any }>;
  stats: Array<{ title: string, component: any, icon: any }>;
  profile: any;
  account: any;

  constructor(
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public appDataService: AppData,
    public serverDataService: ServerData,
  ) {
    this.presentLoading();
    this.initializeApp();

    this.operations = [
      { title: 'Log In', component: SignInPage, icon: 'log-in' }
    ];
    this.pages = [
      { title: 'Home', component: TabsPage, icon: 'home' },
      { title: 'Profile', component: ProfilePage, icon: 'finger-print' },
      { title: 'Sign Up', component: SignUpPage, icon: 'person-add' }
    ];

    this.stats = [
      { title: 'Overall', component: TabStatsPage, icon: 'globe' },
      { title: 'Personal', component: PersonalStatsPage, icon: 'person' }
    ];
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.appDataService.initializeApplication();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  presentLoading() {
    this.loadingCtrl.create({
      content: 'Loading ...',
      duration: 1000,
      dismissOnPageChange: true
    }).present();
  }
}