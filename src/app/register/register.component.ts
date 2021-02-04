import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from './../alert/alert.service';
import { User, Address } from './../model/User';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loading = true;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        street: [''],
        city: [''],
        zipcode: [''],
        username: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPsw: ['', Validators.required],
      },
      {
        validator: this.Matcher('password', 'confirmPsw'),
      }
    );
  }

  // for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) return;

    const addr: Address = {
      street: this.form.get('street')?.value,
      city: this.form.get('city')?.value,
      zipcode: this.form.get('zipcode')?.value,
    };

    const user: User = {
      name: this.form.get('firstName')?.value,
      username: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      address: addr,
      phone: this.form.get('phone')?.value,
      website: this.form.get('website')?.value,
    };

    this.accountService.register(user).subscribe({
      next: (data) => {
        this.alertService.success('Registration successful', {
          keepAfterRouteChange: true,
        });
        this.router.navigateByUrl('');
      },
      error: (error) => {
        this.alertService.error(error);
        this.loading = true;
      },
    });
  }

  /**
   * CUSTOM VALIDATOR:
   *
   * Matches first and second parameter.
   * Sets errors if params aren't matching
   * @param first Control name
   * @param second Matching control name
   */
  Matcher(first: string, second: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[first];
      const matchingControl = formGroup.controls[second];

      if (matchingControl.errors && !matchingControl.errors.Matcher) return;

      if (control.value !== matchingControl.value)
        return matchingControl.setErrors({ Matcher: true });
      else matchingControl.setErrors(null);
    };
  }
}
