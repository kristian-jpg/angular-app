import { User } from './../model/User';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user!: User;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.USER.subscribe((u) => (this.user = u));
  }
}
