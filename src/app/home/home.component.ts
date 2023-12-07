import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  template: `
    <p>Congratulation ! You have logged in successfully !</p>
    <button mat-flat-button color="primary" (click)="logout()">Logout</button>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly router: Router
  ) {}

  logout() {
    this.firebaseService
      .logout()
      .then(() => this.router.navigate(['/', 'login']));
  }
}
