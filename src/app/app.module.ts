import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPermissionsModule } from 'ngx-permissions';
//Http Requests
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//Services
import { AuthService } from './services/autentication/auth'; 
//Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
//Models
import { UserModel } from './models/user/user.model';
///rutas
import { AppRoutingModule } from './app.routes';
//Installed extra modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { PortalModule } from '@angular/cdk/portal';
import { ToastrModule } from 'ngx-toastr';
// RECOMMENDED
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

//Components
import { LoginComponent } from './Components/login/login.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ProductosComponent
    ],
    imports: [
      BrowserModule,
      FontAwesomeModule,
      FormsModule,
      ReactiveFormsModule,
      NgxCaptchaModule,
      DataTablesModule,
      NgxPermissionsModule,
      NgxPermissionsModule.forChild(),
      NgxPermissionsModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      CommonModule,
      BrowserAnimationsModule,
      ToastrModule,
      HttpClientModule
    ],
    providers: [UserModel, AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
      { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent],
    exports: [
      BsDatepickerModule,
      NgxPermissionsModule
    ]
  })
  export class AppModule { }