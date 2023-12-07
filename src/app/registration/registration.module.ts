import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginRoutingModule } from '../login/login-routing.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { MailVerificationComponent } from './mail-verification/mail-verification.component';

@NgModule({
  declarations: [RegistrationComponent, MailVerificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    LoginRoutingModule,
    MatProgressSpinnerModule,
  ],
})
export class RegistrationModule {}