import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { MapPage } from '../pages/map/map';
import { ActivitiesPage } from '../pages/activities/activities';
import { ActivityPage } from '../pages/activity/activity';
import { ProfilePage } from '../pages/profile/profile';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { StatsPage } from '../pages/stats/stats';
import { PersonalStatsPage } from '../pages/personal-stats/personal-stats';
import { GroupStatsPage } from '../pages/group-stats/group-stats';

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
  name: string;
  isActivated: any;

  constructor(
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public appDataService: AppData,
    public serverDataService: ServerData
  ) {
    this.presentLoading();
    
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: TabsPage, icon: 'home' },
      { title: 'Profile', component: ProfilePage, icon: 'person' },
      { title: 'Attendance', component: ActivitiesPage, icon: 'list' },
    ];

    this.pages = [
      { title: 'Sign In', component: SignInPage, icon: 'log-in' },
      { title: 'Sign Up', component: SignUpPage, icon: 'person-add' }
    ];

    this.stats = [
      { title: 'Personal', component: PersonalStatsPage, icon: 'person' },
      { title: 'Group', component: GroupStatsPage, icon: 'people' },
    ];
  }
  requestForActivation() {
    this.nav.push(SignInPage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

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