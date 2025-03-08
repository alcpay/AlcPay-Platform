import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../app/environments/environment';

/**
 * Interface representing the structure of insights response from the API.
 * Contains datasets with visualization properties for charts.
 */
interface InsightResponse {
  datasets: {
    label: string; // Label for the dataset
    data: number[]; // Numerical data points
    backgroundColor: string; // Color for data visualization
    borderRadius: number; // Border radius for chart elements
  }[];
}

/**
 * InsightsService handles API interactions for retrieving KPI and order insights.
 *
 * @example
 * // Fetch insights with optional filter parameters
 * insightsService.getInsights({
 *   startDate: '2023-01-01',
 *   endDate: '2023-12-31',
 *   retailer: 'Example Retailer'
 * }).subscribe(insights => {
 *   // Process insights data
 * });
 */
@Injectable({
  providedIn: 'root',
})
export class InsightsService {
  // Base API URL from environment configuration
  private readonly BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Retrieve insights data with flexible query parameters.
   *
   * @param data Optional filter parameters for insights query
   * @returns Observable with insights response
   */
  getInsights(
    data?: Record<string, string | number>,
  ): Observable<InsightResponse> {
    // Create flexible HTTP params for dynamic filtering
    const params = data
      ? Object.entries(data).reduce(
          (httpParams, [key, value]) => httpParams.set(key, String(value)),
          new HttpParams(),
        )
      : new HttpParams();

    return this.http.get<InsightResponse>(
      `${this.BASE_URL}/public/kpi/orders`,
      { params },
    );
  }
}
