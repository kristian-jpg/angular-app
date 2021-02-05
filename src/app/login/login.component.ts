import { AlertService } from './../alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) return;

    const em: string = this.form.get('email')?.value;
    const psw: string = this.form.get('password')?.value;

    this.accountService.login(em, psw).subscribe({
      next: (result) => {
        if (result == undefined) {
          this.alertService.clear();
          this.alertService.error('Incorrect email or password');
        } else {
          this.accountService.USER = result;
          this.alertService.success('Welcome back ' + result.name, {
            keepAfterRouteChange: true,
          });
          this.router.navigateByUrl('');
        }
      },
      error: (error) => {
        this.alertService.error(error);
      },
    });
  }
}
