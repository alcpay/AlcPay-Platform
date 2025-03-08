import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface IStatsGridConfig {
  title?: string | null; // Optional title for the stats grid
  stats?: Array<IStat> | IStat[] | null; // Array of statistical data
  subtitle?: string | null; // Optional subtitle for the stats grid
  helpLink?: string | null; // Optional help link for additional information
  helpText?: string | null; // Optional help text for guidance
  gridCols?: number | null; // Optional number of grid columns
  styleClass?: string | null; // Optional inject your custom css classes in the wrapping `<div></div>`
}

export interface IStat {
  metricTitle?: string | null; // Title of the metric
  metricValue?: string | null | number; // Value of the metric
  metricStyleClass?: string | null;
  metricChangeValue?: string | number | null; // Change value of the metric
  metricChangeType?: 'positive' | 'negative' | 'neutral' | '' | null; // Type of change
}

/**
 * StatsComponent
 *
 * This component displays statistical data such as revenue, invoices, and expenses.
 * It uses Tailwind CSS for styling and Angular's CommonModule for common directives.
 * The component accepts an input property `configData` to dynamically pass statistical data.
 *
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'ui-stats-grid',
  templateUrl: './stats-grid.component.html',
  styleUrls: ['./stats-grid-component.css'],
})
export default class StatsGridComponent {
  /**
   * Input property to accept statistical data configuration
   * @type {IStatsGridConfig}
   */
  @Input() configData: IStatsGridConfig = { stats: new Array<IStat>() };

  constructor() {
    this.configData = this.configData ?? null;
  }

  /**
   * TrackBy function for ngFor to optimize rendering
   * @param index - Index of the current item
   * @param stat - Current stat object
   * @returns The metricTitle of the stat as a unique identifier
   */
  trackByStatName(index: number, stat: IStat): string | null | undefined {
    console.log('trackByStatName => index: ', index);
    console.log('trackByStatName => stat: ', stat);
    return stat.metricTitle;
  }
}
