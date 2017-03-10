import { Component } from '@angular/core';

import { StatsPage } from '../stats/stats';
import { GroupStatsPage } from '../group-stats/group-stats';
import { PersonalStatsPage } from '../personal-stats/personal-stats';

@Component({
  templateUrl: 'tabs.stats.html'
})
export class TabStatsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = StatsPage;
  tab2Root: any = PersonalStatsPage;
  tab3Root: any = GroupStatsPage;

  constructor() {

  }
}
