import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private postUrl = 'assets/register.json';
  private getUrl = 'assets/mock.json';

  isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('auth-token');
  }

  /**
   * Set new auth-token, appends id to token value
   * @param id {number}
   */
  setToken(id: number | undefined): void {
    localStorage.setItem('auth-token', '1q2w3e4r5t6y7u8i9o0pxx' + id);
    console.log('Setting new token: ' + localStorage.getItem('auth-token'));
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  /**
   * Removes authentication token from local storage and updates status to false
   */
  logout(): void {
    localStorage.removeItem('auth-token');
    this.isLoggedInSubject.next(false);
    console.log('Logout: auth-token removed successfully');
  }

  //HTTP
  register(user: User) {
    return this.http.get(this.postUrl);
  }

  //HTTP
  login(email: string, psw: string): Observable<User | any> {
    return this.http.get<User[]>(this.getUrl).pipe(
      map((users) => {
        return users.find((u) => u.email === email);
      })
    );
  }
}
