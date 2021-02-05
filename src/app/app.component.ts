import { Observable } from 'rxjs';
import { AccountService } from './services/account.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'App';
  isLoggedIn: Observable<boolean>;

  constructor(public accountService: AccountService) {
    this.isLoggedIn = accountService.isLoggedIn();
  }
}
