import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from './../environments/environment'
import { InventoryLocation } from '../models'

/**
 * Service for managing inventory locations
 * Handles API calls for retrieving inventory location data
 */
@Injectable({
  providedIn: 'root',
})
export class InventoryLocationsService {
  // Base API URL from environment configuration
  private readonly BASE_URL = environment.apiUrl

  constructor(private http: HttpClient) {}

  /**
   * Get all inventory locations
   * @returns Observable<InventoryLocation[]> List of inventory locations
   */
  list(): Observable<InventoryLocation[]> {
    return this.http
      .get<InventoryLocation[]>(`${this.BASE_URL}/public/inventory-locations`)
      .pipe(map((response) => response))
  }

  /**
   * Create a new inventory location
   * @param location The inventory location data to create
   * @returns Observable<InventoryLocation> The created inventory location
   */
  create(location: InventoryLocation): Observable<InventoryLocation> {
    return this.http
      .post<InventoryLocation>(`${this.BASE_URL}/public/inventory-locations`, location)
      .pipe(map((response) => response))
  }

  /**
   * Update an existing inventory location
   * @param location The inventory location data to update
   * @returns Observable<InventoryLocation> The updated inventory location
   * @throws Error if location.id is null
   */
  update(location: InventoryLocation): Observable<InventoryLocation> {
    if (!location.id) {
      throw new Error('Location ID is required for update')
    }
    return this.http
      .put<InventoryLocation>(`${this.BASE_URL}/public/inventory-locations/${location.id}`, location)
      .pipe(map((response) => response))
  }

  /**
   * Delete an inventory location
   * @param id The ID of the inventory location to delete
   * @returns Observable<void>
   */
  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.BASE_URL}/public/inventory-locations/${id}`)
      .pipe(map((response) => response))
  }

  /**
   * Get a single inventory location by ID
   * @param id The ID of the inventory location to retrieve
   * @returns Observable<InventoryLocation> The requested inventory location
   */
  get(id: string): Observable<InventoryLocation> {
    return this.http
      .get<InventoryLocation>(`${this.BASE_URL}/public/inventory-locations/${id}`)
      .pipe(map((response) => response))
  }
}
