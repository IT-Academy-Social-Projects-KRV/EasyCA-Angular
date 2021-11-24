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
import { ModalInspectors } from './components/list-inspector/modal-inspectors/modal-inspector.component';
import { ListEPComponent } from './components/admin/list-ep/list-ep.component';
import { ListInspectors } from './components/list-inspector/list-inspector.component';
import { PersonalDataIsEmptyComponent } from './components/personal-cabinet/personal-data-is-empty/personal-data-is-empty.component';
import { PersonalDataModalComponent } from './components/personal-cabinet/personal-data-modal/personal-data-modal.component';
import { BasicInfoComponent } from './components/personal-cabinet/basic-info/basic-info.component';
import { AddressComponent } from './components/personal-cabinet/address/address.component';
import { DriverLicenseComponent } from './components/personal-cabinet/driver-license/driver-license.component';
import { EuroProtocolViewFormComponent } from './components/euro-protocol-view-form/euro-protocol-view-form.component';
import { ConfirmComponent } from './components/violation-list/euro-protocol-notconfirmed-view-form/euro-protocol-notconfirmed-view-form.component';
import { EnterDataSecondSideComponent } from './components/violation-list/enter-data-second-side/enter-data-second-side.component';
import { TransportDataModalComponent } from './components/transport/transport-data-modal/transport-data-modal.component';
import { TermsComponent } from './components/euro-protocol/terms/terms.component';
import { AccidentAddressComponent } from './components/euro-protocol/accident-address/accident-address.component';
import { CheckInsuranceComponent } from './components/euro-protocol/check-insurance/check-insurance.component';
import { CircumstancesComponent } from './components/euro-protocol/circumstances/circumstances.component';
import { ConfirmationComponent } from './components/euro-protocol/confirmation/confirmation.component';
import { EvidenceComponent } from './components/euro-protocol/evidence/evidence.component';
import { ParticipantInfoComponent } from './components/euro-protocol/participant-info/participant-info.component';
import { WitnessesComponent } from './components/euro-protocol/witnesses/witnesses.component';
import { InspectorListOfCarAccidentsComponent } from './components/inspector/inspector-list-of-car-accidents/inspector-list-of-car-accidents.component';
import { ChangePasswordModalComponent } from './components/personal-cabinet/change-password-modal/change-password-modal.component';
import { ViewCAComponent } from './components/inspector/view-ca-modal/view-ca.component';
import { FileUploadComponent } from './components/file/file-upload/file-upload.component';
import { FileViewComponent } from './components/file/file-view/file-view.component';
import { CarAccidentsListComponent } from './components/admin/car-accidents-list/car-accidents-list.component';
import { InspectorListOfDriverCaComponent } from './components/inspector/inspector-list-of-driver-ca/inspector-list-of-driver-ca.component';
import { ParticipantCAProtocolsComponent } from './components/participant-ca-protocols/participant-ca-protocols.component';
import { AdminViewCAComponent } from './components/admin/admin-view-ca/admin-view-ca.component';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfigService } from './services/app-config.service';
import { ParticipantViewCaComponent } from './components/participant-view-ca/participant-view-ca.component';
import { AllDataComponent } from './components/violation-list/enter-data-second-side/all-data/all-data.component';
import { CircumstanceComponent } from './components/violation-list/enter-data-second-side/circumstance/circumstance.component';
import { SucessComponent } from './components/violation-list/enter-data-second-side/sucess/sucess.component';

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
    ListEPComponent,
    ListInspectors,
    PersonalDataIsEmptyComponent,
    PersonalDataModalComponent,
    BasicInfoComponent,
    AddressComponent,
    DriverLicenseComponent,    
    ConfirmComponent,
    EnterDataSecondSideComponent,
    InspectorListOfCarAccidentsComponent,
    ChangePasswordModalComponent,
    TransportDataModalComponent,
    TermsComponent,
    AccidentAddressComponent,
    CheckInsuranceComponent,
    CircumstancesComponent,
    ConfirmationComponent,
    EvidenceComponent,
    ParticipantInfoComponent,
    WitnessesComponent,
    InspectorListOfCarAccidentsComponent,
    ChangePasswordModalComponent,
    ViewCAComponent,
    FileUploadComponent,
    FileViewComponent,
    CarAccidentsListComponent,
    InspectorListOfDriverCaComponent,
    ParticipantCAProtocolsComponent,
    AdminViewCAComponent,
    ParticipantViewCaComponent,    
    ViewCAComponent,
    AllDataComponent,
    CircumstanceComponent,
    SucessComponent
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
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        };
      }
    },
    authInterceptorProviders,
    CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
