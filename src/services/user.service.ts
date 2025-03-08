import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../app/environments/environment';
/**
 * User model interface describing the shape of user data.
 * TODO: Expand the interface to include additional user properties.
 */
import { User } from '../models/user.model';

/**
 * UserService handles user authentication and management.
 *
 * This service manages user login, registration, and logout processes with local storage integration.
 *
 * @see UserService
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  // BehaviorSubject to track the current user state, typed as User or null.
  private currentUserState: BehaviorSubject<any>;

  // Observable for components to subscribe to current user state changes.
  public currentUser: Observable<User | any | null>;

  /**
   * Constructs the UserService.
   * @param http Angular HttpClient for making API requests.
   */
  constructor(private http: HttpClient) {
    // Retrieve the current user from local storage, if available.
    const storedUser = localStorage.getItem('currentUser');
    const initialUser: any = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserState = new BehaviorSubject<any>(initialUser);
    this.currentUser = this.currentUserState.asObservable();
  }

  /**
   * Getter for the current user.
   *
   * @returns {any} The current user object or null if not authenticated.
   * @todo: Remove the any type when the User model is expanded.
   */
  public get currentUserInfo(): any {
    return this.currentUserState.value;
  }

  /**
   * Authenticate a user and store credentials.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @param {boolean} rememberMe - Flag indicating whether to persist the login.
   * @returns {Observable<User>} Observable emitting the authenticated user data.
   * @throws An error if the response does not contain a valid accessToken.
   */
  login(
    email: string,
    password: string,
    rememberMe: boolean,
  ): Observable<User> {
    return this.http
      .post<any>(`${environment.apiUrl}/public/auth/login`, { email, password })
      .pipe(
        map((response) => {
          // Validate that the response contains an accessToken.
          if (response.data && response.data.accessToken) {
            const user: User = response.data;
            // Store user details in local storage.
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('rememberMe', String(user.email));
            // Update the current user state.
            this.currentUserState.next(user);
            return user;
          }
          throw new Error('Invalid login response: accessToken missing');
        }),
      );
  }

  /**
   * Register a new brand account.
   *
   * @param {string} email - The contact email for the brand.
   * @param {string} password - The account password.
   * @param {boolean} rememberMe - Flag indicating whether to persist the login.
   * @param {string} brandName - The name of the brand.
   * @param {string} contact - Contact information.
   * @param {string} website - The brand's website URL.
   * @returns {Observable<User>} Observable emitting the registered user data.
   * @throws An error if the response does not contain a valid accessToken.
   */
  registerBrand(
    email: string,
    password: string,
    rememberMe: boolean,
    brandName: string,
    contact: string,
    website: string,
  ): Observable<User> {
    // Construct payload with fields provided.
    const payload: any = {
      ...(email && { email }),
      ...(password && { password }),
      ...(brandName && { brandName }),
      ...(contact && { contact }),
      ...(website && { website }),
    };

    return this.http
      .post<any>(`${environment.apiUrl}/public/brand/register`, payload)
      .pipe(
        map((response) => {
          // Validate that the response contains an accessToken.
          if (response.data && response.data.accessToken) {
            const user: User = response.data;

            // Store user details in local storage.
            localStorage.setItem('currentUser', JSON.stringify(user));
            // Store the email in local storage for remember me functionality.
            localStorage.setItem('rememberMe', String(email));

            // Update the current user state.
            this.currentUserState.next(user);

            return user;
          }
          throw new Error('Invalid registration response: accessToken missing');
        }),
      );
  }

  /**
   * Logout the user by clearing stored credentials.
   */
  logout(): void {
    // Remove user data from local storage.
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');

    // Reset the current user state.
    this.currentUserState.next(null);
  }

  // Example method: Get user data
  getUserData(): Observable<User> {
    return this.http.get<User>('/api/user');
  }
}
