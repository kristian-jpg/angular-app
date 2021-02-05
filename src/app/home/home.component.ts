import { User } from './../model/User';
import { AccountService } from '../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
  }
}
