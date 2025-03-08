import { Component, OnInit } from '@angular/core';
import StatsGridComponent, {
  IStatsGridConfig,
  IStat,
} from './../../components/stats-grid/stats-grid.component';

@Component({
  standalone: true,
  imports: [StatsGridComponent],
  template: `
    <div>
      <h1 class="pb-4">Dashboard</h1>
      <ui-stats-grid [configData]="fakeStatsConfig" />
    </div>
  `,
})
export default class DashboardPage implements OnInit {
  constructor() {}

  /**
   * Fake stats configuration for the stats grid component.
   * @type {IStatsGridConfig}
   */
  fakeStatsConfig: IStatsGridConfig = {
    title: 'Dashboard Stats',
    stats: [
      {
        metricTitle: 'Alcohol Revenue',
        metricValue: '$10,010',
        metricChangeValue: '+5%',
        metricChangeType: 'positive',
        metricStyleClass: '',
      },
      {
        metricTitle: 'Cases Sold',
        metricValue: '100',
        metricChangeValue: '-2%',
        metricChangeType: 'negative',
        metricStyleClass: '',
      },
      {
        metricTitle: 'Cases Returned',
        metricValue: '123',
        metricChangeValue: '+23',
        metricChangeType: 'negative',
        metricStyleClass: '',
      },
      {
        metricTitle: 'Ad Spend p/Unit Sold',
        metricValue: '$11.32',
        metricChangeValue: '-$4.24',
        metricChangeType: 'positive',
        metricStyleClass: '',
      },
    ],
    subtitle: 'Overview of the key metrics',
    helpLink: '/help/stats',
    helpText: 'Click here for more information about these metrics.',
    gridCols: 4,
    styleClass: 'custom-stats-grid',
  };

  ngOnInit(): void {}
}
