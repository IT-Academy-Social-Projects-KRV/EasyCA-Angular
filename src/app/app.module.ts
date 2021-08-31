import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoNgZorroAntdModule } from './ant-design-module/ng-zorro-antd-module';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { HttpClientModule }   from '@angular/common/http';
import { PersonalCabinetComponent } from './components/personal-cabinet/personal-cabinet';
import { ProfileComponent } from './components/profile/profile';
import { TransportComponent } from './components/transport/trannsport';
import { ViolationListComponent } from './components/violation-list/violation-list';
import { DriverLicenseComponent } from './components/driver-license/driver-license';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    LoginFormComponent,
    AppComponent,
    RegistrationFormComponent,
    HomePageComponent,
    LayoutComponent,
    PersonalCabinetComponent,
    ProfileComponent,
    TransportComponent,
    ViolationListComponent,
    DriverLicenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    HttpClientModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }],
  bootstrap: [AppComponent]
})
export class AppModule { }
