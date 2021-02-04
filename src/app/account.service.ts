import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './model/User';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private postUrl = 'assets/register.json';
  private getUrl = 'assets/mock.json';

  public USER!: Observable<User>;

  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.get(this.postUrl);
  }

  login(email: string, psw: string): Observable<User | any> {

    return this.http.get<User[]>(this.getUrl).pipe(
      map((users) => {
        return users.find((u) => u.email === email);
      })
    );
  }
}
