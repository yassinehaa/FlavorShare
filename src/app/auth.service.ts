import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse, User } from './models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Only attempt to get user from storage in the browser
    if (isPlatformBrowser(this.platformId)) {
      const user = this.getUserFromStorage();
      if (user) {
        this.currentUserSubject.next(user);
      }
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => {
        if (users.length === 0) {
          throw new Error('User not found');
        }

        const user = users[0];
        if (user.password !== password) {
          throw new Error('Invalid password');
        }
        // Only access localStorage in the browser
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
        return { user };
      })
    );
  }

  logout(): void {
    // Only access localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  private getUserFromStorage(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null; // Return null during SSR
  }
}
