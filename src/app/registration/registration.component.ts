import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../firebase.service';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-registration',
  template: `
    <div class="container">
      <mat-spinner *ngIf="loading"></mat-spinner>
      <h1>Sign Up</h1>
      <form [formGroup]="registrationForm">
        <mat-form-field appearance="outline">
          <mat-label>E-mail</mat-label>
          <input type="email" matInput formControlName="email" />
          <mat-error
            *ngIf="
              registrationForm.get('email')?.hasError('email') &&
              !registrationForm.get('email')?.hasError('required')
            "
          >
            Please enter a valid email address
          </mat-error>
          <mat-error
            *ngIf="registrationForm.get('email')?.hasError('required')"
          >
            Name is required
          </mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <input type="text" matInput formControlName="name" />
          <mat-error *ngIf="registrationForm.get('name')?.hasError('required')">
            Name is required
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
          <mat-error
            *ngIf="registrationForm.get('password')?.hasError('required')"
          >
            PAssword is required
          </mat-error>
        </mat-form-field>
        <button mat-flat-button color="primary" (click)="createUser()">
          Sign Up
        </button>
      </form>
      <div class="sign-in">
        Already have an account ?
        <a [routerLink]="['/', 'login']">Login</a>
      </div>
    </div>
  `,
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  showPassword = false;
  loading = false;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      name: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
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

  createUser(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    this.loading = true;
    const user = this.registrationForm.value;


  }
}
