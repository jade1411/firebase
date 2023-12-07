import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailVerificationComponent } from './mail-verification/mail-verification.component';
import { RegistrationComponent } from './registration.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  },
  {
    path: 'mail-verification',
    component: MailVerificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}