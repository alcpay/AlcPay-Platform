import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from './../environments/environment'
import { AuthenticatedUser } from '../models'
// The localStorage object is a built-in browser API and does not need to be imported.
/**
 * AuthService handles user authentication and management.
 *
 * This service manages the current user state and provides methods to interact with user authentication.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // BehaviorSubject to track the current user state, typed as AuthenticatedUser or null.
  private currentUserSubject: BehaviorSubject<AuthenticatedUser | null>

  // Observable for components to subscribe to current user state changes.
  public currentUser: Observable<AuthenticatedUser | null>

  /**
   * Constructs the AuthService.
   * @param http Angular HttpClient for making API requests.
   */
  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser')
    const initialUser: AuthenticatedUser | null = storedUser ? JSON.parse(storedUser) : null
    this.currentUserSubject = new BehaviorSubject<AuthenticatedUser | null>(initialUser)
    this.currentUser = this.currentUserSubject.asObservable()
  }

  /**
   * Get the current user value.
   *
   * @returns {AuthenticatedUser | null} The current user object or null if not authenticated.
   */
  public get currentUserValue(): AuthenticatedUser | null {
    return this.currentUserSubject.value
  }

  /**
   * Get the current user as an observable.
   *
   * @returns {Observable<AuthenticatedUser | null>} Observable emitting the current user object or null if not authenticated.
   */
  public getCurrentUser(): AuthenticatedUser | null {
    return this.currentUserSubject.value
  }

  /**
   * Authenticate a user and update the current user state.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @param {boolean} rememberMe - Flag to remember the user.
   * @returns {Observable<AuthenticatedUser>} Observable emitting the authenticated user data.
   * @throws An error if the response does not contain a valid accessToken.
   */
  login(email: string, password: string, rememberMe: boolean): Observable<AuthenticatedUser> {
    return this.http
      .post<{ data: AuthenticatedUser }>(`${environment.apiUrl}/public/auth/login`, { email, password })
      .pipe(
        map((response) => {
          // Validate that the response contains an accessToken.
          if (response.data && response.data.accessToken) {
            const user: AuthenticatedUser = response.data
            // Update the current user state.
            this.currentUserSubject.next(user)
            // Store user details in local storage.
            localStorage.setItem('currentUser', JSON.stringify(user))
            localStorage.setItem('savedEmail', email)
            return user
          }
          throw new Error('Invalid login response: accessToken missing')
        }),
      )
  }

  /**
   * Logout the user by clearing the current user state.
   *
   * @returns {void}
   */
  logout(): void {
    // Reset the current user state.
    this.currentUserSubject.next(null)
    // Clear user details from local storage.
    localStorage.removeItem('currentUser')
    localStorage.removeItem('savedEmail')
  }

  /**
   * Register a new brand user.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @param {string} brandName - The name of the brand.
   * @param {string} contact - The contact information for the brand.
   * @param {string} website - The website of the brand.
   * @returns {Observable<AuthenticatedUser>} Observable emitting the registered user data.
   * @throws An error if the response does not contain a valid accessToken.
   */
  register(
    email: string,
    password: string,
    brandName: string,
    contact: string,
    website: string,
  ): Observable<AuthenticatedUser> {
    // Construct payload with fields provided.
    const payload = {
      email,
      password,
      brandName,
      contact,
      website,
    }

    return this.http.post<{ data: AuthenticatedUser }>(`${environment.apiUrl}/public/brand/register`, payload).pipe(
      map((response) => {
        // Validate that the response contains an accessToken.
        if (response.data && response.data.accessToken) {
          const user: AuthenticatedUser = response.data

          // Store user details in local storage.
          localStorage.setItem('currentUser', JSON.stringify(user))
          // Store the email in local storage for remember me functionality.
          localStorage.setItem('savedEmail', email)

          // Update the current user state.
          this.currentUserSubject.next(user)

          return user
        }
        throw new Error('Invalid registration response: accessToken missing')
      }),
    )
  }
}
