import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
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
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { PersonalCabinetComponent } from './components/personal-cabinet/personal-cabinet';
import { ViolationListComponent } from './components/violation-list/violation-list.component';
import { TransportComponent } from './components/transport/transport-component';
import { EmailFormComponent } from './components/email-form/email-form.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { AfterRestorePasswordComponent } from './components/after-restore-password/after-restore-password.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ToastrModule } from 'ngx-toastr';
import { EuroProtocolComponent } from './components/euro-protocol/euro-protocol.component';
import { CookieService } from 'ngx-cookie-service';
import { ResendConfirmationComponent } from './components/resend-confirmation/resend-confirmation.component';
import { EuroProtocolViewFormComponent } from './euro-protocol-view-form/euro-protocol-view-form.component';
import { ModalInspectors } from './components/list-inspector/modal-inspectors/modal-inspector.component';
import { ListCAComponent } from './components/list-ca/list-ca.component';
import { ModalCAComponent } from './components/list-ca/modal-ca/modal-ca.component';
import { ListInspectors } from './components/list-inspector/list-inspector.component';
import { PersonalDataIsEmptyComponent } from './components/personal-cabinet/personal-data-is-empty/personal-data-is-empty.component';
import { PersonalDataModalComponent } from './components/personal-cabinet/personal-data-modal/personal-data-modal.component';
import { BasicInfoComponent } from './components/personal-cabinet/basic-info/basic-info.component';
import { AddressComponent } from './components/personal-cabinet/address/address.component';
import { DriverLicenseComponent } from './components/personal-cabinet/driver-license/driver-license.component';
import { TransportDataModalComponent } from './components/transport/transport-data-modal/transport-data-modal.component';

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
    TransportComponent,
    ViolationListComponent,
    EmailFormComponent,
    EuroProtocolComponent,
    RestorePasswordComponent,
    AfterRestorePasswordComponent,
    ResendConfirmationComponent,
    EuroProtocolViewFormComponent,
    ModalInspectors,
    ListCAComponent,
    ModalCAComponent,
    ListInspectors,
    PersonalDataIsEmptyComponent,
    PersonalDataModalComponent,
    BasicInfoComponent,
    AddressComponent,
    DriverLicenseComponent,
    TransportDataModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ScrollingModule,
    DragDropModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
    authInterceptorProviders,
    CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
