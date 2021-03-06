import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { ActivitiesPage } from '../activities/activities';
import { StatsPage } from '../stats/stats';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MapPage;
  tab2Root: any = ActivitiesPage;
  tab3Root: any = StatsPage;

  constructor() {

  }
}
