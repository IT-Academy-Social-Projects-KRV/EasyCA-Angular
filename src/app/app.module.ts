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
import { ProfileComponent } from './components/profile/profile';
import { TransportComponent } from './components/transport/transport';
import { ViolationListComponent } from './components/violation-list/violation-list';
import { EmailFormComponent } from './components/email-form/email-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

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
    EmailFormComponent
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
