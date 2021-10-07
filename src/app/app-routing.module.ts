import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { EmailFormComponent } from './components/email-form/email-form.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { AfterRestorePasswordComponent } from './components/after-restore-password/after-restore-password.component';
import { PersonalCabinetComponent } from './components/personal-cabinet/personal-cabinet';
import { ViolationListComponent } from './components/violation-list/violation-list.component';
import { TransportComponent } from './components/transport/transport-component';
import { EuroProtocolComponent } from './components/euro-protocol/euro-protocol.component';
import { ResendConfirmationComponent } from './components/resend-confirmation/resend-confirmation.component';
import { TermsComponent } from './components/euro-protocol/terms/terms.component';
import { WitnessesComponent } from './components/euro-protocol/witnesses/witnesses.component';
import { ParticipantInfoComponent } from './components/euro-protocol/participant-info/participant-info.component';
import { EvidenceComponent } from './components/euro-protocol/evidence/evidence.component';
import { CheckInsuranceComponent } from './components/euro-protocol/check-insurance/check-insurance.component';
import { CircumstancesComponent } from './components/euro-protocol/circumstances/circumstances.component';
import { AccidentAddressComponent } from './components/euro-protocol/accident-address/accident-address.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signin', component: LoginFormComponent },
  { path: 'signup', component: RegistrationFormComponent },
  { path: 'personal', component: PersonalCabinetComponent},
  { path: 'emailVerify', component: EmailFormComponent},
  { path: 'forgotPassword', component: RestorePasswordComponent},
  { path: 'restorePassword', component: AfterRestorePasswordComponent},
  { path: 'transportList', component: TransportComponent},
  { path: 'violationList', component: ViolationListComponent},
  { path: 'euroProtocol', component: EuroProtocolComponent},
  { path: 'resendConfirmation', component: ResendConfirmationComponent },
  { path: 'terms', component: TermsComponent},
  { path: 'witnesses', component: WitnessesComponent},
  { path: 'participantInfo', component: ParticipantInfoComponent},
  { path: 'evidence', component: EvidenceComponent},
  { path: 'confirmation', component: EvidenceComponent},
  { path: 'checkInsurance', component: CheckInsuranceComponent},
  { path: 'circumstances', component: CircumstancesComponent},
  { path: 'accidentAddress', component: AccidentAddressComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export class NzDemoLayoutFixedComponent { }
