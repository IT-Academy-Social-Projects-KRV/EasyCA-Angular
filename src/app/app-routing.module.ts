import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';


import { EmailFormComponent } from './components/email-form/email-form.component';
import { PersonalCabinetComponent } from './components/personal-cabinet/personal-cabinet';
import { TransportComponent } from './components/transport/transport';

import { ViolationListComponent } from './components/violation-list/violation-list';
import { ProfileComponent } from './components/profile/profile';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signin', component: LoginFormComponent },
  { path: 'signup', component: RegistrationFormComponent },
  { path: 'personal', component: PersonalCabinetComponent},
  { path: 'emailVerify', component: EmailFormComponent},
  { path: 'transportList', component: TransportComponent},
  { path: 'violationList', component: ViolationListComponent},
  { path: 'profile', component: ProfileComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export class NzDemoLayoutFixedComponent { }
