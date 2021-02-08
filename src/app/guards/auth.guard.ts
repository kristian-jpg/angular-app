import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private isLogged: boolean = false;
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.accountService
      .isLoggedIn()
      .subscribe((data) => (this.isLogged = data));

    if (this.isLogged) {
      this.router.navigateByUrl('');
    }
    return !this.isLogged;
  }
}
