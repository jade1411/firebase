import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-mail-verification',
  template: `
    <div class="container">
      <mat-spinner *ngIf="loading"></mat-spinner>
      <mat-icon>security</mat-icon>
      <h1>Verify your Email</h1>
      <span
        >An 6-digit code has been sent to
        <a [href]="'mailto:' + user.email">{{ user.email }}</a></span
      >
      <div class="fields-container">
        <mat-form-field
          appearance="outline"
          [ngClass]="{ focused: cursor === 0 }"
        >
          <input matInput [(ngModel)]="codeDigits[0]" readonly />
        </mat-form-field>
        <mat-form-field
          appearance="outline"
          [ngClass]="{ focused: cursor === 1 }"
        >
          <input matInput [(ngModel)]="codeDigits[1]" readonly />
        </mat-form-field>
        <mat-form-field
          appearance="outline"
          [ngClass]="{ focused: cursor === 2 }"
        >
          <input matInput [(ngModel)]="codeDigits[2]" readonly />
        </mat-form-field>
        <mat-form-field
          appearance="outline"
          [ngClass]="{ focused: cursor === 3 }"
        >
          <input matInput [(ngModel)]="codeDigits[3]" readonly />
        </mat-form-field>
        <mat-form-field
          appearance="outline"
          [ngClass]="{ focused: cursor === 4 }"
        >
          <input matInput [(ngModel)]="codeDigits[4]" readonly />
        </mat-form-field>
        <mat-form-field
          appearance="outline"
          [ngClass]="{ focused: cursor === 5 }"
        >
          <input matInput [(ngModel)]="codeDigits[5]" readonly />
        </mat-form-field>
      </div>
      <span
        >Didn't recive the code ?
        <a href="" (click)="resendVerificationCode()">Resend</a></span
      >
      <button mat-flat-button color="primary" (click)="verifyCode()">
        Verifiy
      </button>
    </div>
  `,
  styleUrls: ['./mail-verification.component.scss'],
})
export class MailVerificationComponent implements OnInit {
  user!: any;
  codeDigits: number[] = [];
  cursor = 0;
  loading = false;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') ?? '');
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Backspace' && this.cursor > 0) {
      this.codeDigits.pop();
      this.cursor--;
    } else if (
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key)
    ) {
      this.codeDigits.push(parseInt(event.key, 10));
      this.cursor++;
    }
  }

  resendVerificationCode() {}

  setCode(digit: number): void {
    if (this.codeDigits.length > 5) {
      return;
    }

    this.codeDigits.push(digit);
  }

  verifyCode(): void {
    const verificationCode = this.codeDigits.reduce(
      (accum, digit) => accum * 10 + digit,
      0
    );
    this.loading = true;
    this.firebaseService
      .checkEmailVerificationCode(this.user.uid, verificationCode)
      .then(() => {
        localStorage.setItem(
          'user',
          JSON.stringify({ ...this.user, emailVerified: true })
        );
        this.router.navigate(['/', 'home']);
      })
      .catch((error: { message: string | undefined; }) => {
        this.toastrService.error(error.message);
      })
      .finally(() => (this.loading = false));
  }

  removeDigit(): void {
    if (this.codeDigits.length < 1) {
      return;
    }

    this.codeDigits.pop();
  }
}