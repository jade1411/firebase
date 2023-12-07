import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="container">
      <mat-spinner *ngIf="loading"></mat-spinner>
      <h1>Login</h1>
      <form [formGroup]="loginForm">
        <mat-form-field appearance="outline">
          <mat-label>E-mail</mat-label>
          <input type="email" matInput formControlName="email" />
          <mat-error
            *ngIf="
              loginForm.get('email')?.hasError('email') &&
              !loginForm.get('email')?.hasError('required')
            "
          >
            Please enter a valid email address
          </mat-error>
          <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
            Email is required
          </mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <input
            [type]="showPassword ? 'text' : 'password'"
            matInput
            formControlName="password"
          />
          <mat-icon matSuffix (click)="toggleDisplayPassword()">{{
            showPassword ? 'visibility' : 'visibility_off'
          }}</mat-icon>
          <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
            Password is required
          </mat-error>
        </mat-form-field>
        <button mat-flat-button color="primary" (click)="login()">Login</button>
      </form>
      <div class="sign-up">
        Don't you have an account ?
        <a [routerLink]="['/', 'registration']">Sign up</a>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  loading = false;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [Validators.required]),
    });
  }

  toggleDisplayPassword(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.firebaseService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .then(() => {
        this.toastrService.success('User logged in successfuly');
        this.router.navigate(['/', 'home']);
      })
      .catch((error) => this.toastrService.error(error.message))
      .finally(() => (this.loading = false));
  }
}
