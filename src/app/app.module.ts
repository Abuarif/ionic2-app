import { NgModule, ErrorHandler } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MapPage } from '../pages/map/map';
import { ActivitiesPage } from '../pages/activities/activities';
import { ActivityPage } from '../pages/activity/activity';
import { ProfilePage } from '../pages/profile/profile';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { StatsPage } from '../pages/stats/stats';
import { PersonalStatsPage } from '../pages/personal-stats/personal-stats';
import { GroupStatsPage } from '../pages/group-stats/group-stats';
import { TabsPage } from '../pages/tabs/tabs';

import { AppData, Profile, Account, ApiServer } from '../providers/app-data';
import { ServerData } from '../providers/server-data';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    ActivitiesPage,
    ActivityPage,
    ProfilePage,
    SignInPage,
    SignUpPage,
    StatsPage,
    PersonalStatsPage,
    GroupStatsPage,
    // Profile,
    // Account, 
    // ApiServer,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    ActivitiesPage,
    ActivityPage,
    ProfilePage,
    SignInPage,
    SignUpPage,
    StatsPage,
    PersonalStatsPage,
    GroupStatsPage,
    // Profile,
    // Account, 
    // ApiServer,
    TabsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppData,
    Profile, 
    Account, 
    ApiServer,
    ServerData
  ]
})
export class AppModule {}
