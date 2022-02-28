import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './userservice.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BioComponent } from './bio/bio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IsAnimationDoneServiceComponent } from './is-animation-done-service/is-animation-done-service.component';
import { ProjectPanelComponent } from './project-panel/project-panel.component';
import { StorefrontComponent } from './storefront/storefront.component';
import { WarehouseService } from './warehouse.service';
import { ClientComponent } from './client/client.component';
import { CartComponent } from './cart/cart.component';
import { ClientloginComponent } from './clientlogin/clientlogin.component';
import { StorefrontCategoriesOfferingsComponent } from './storefront-categories-offerings/storefront-categories-offerings.component';
import { EncryptionComponent } from './encryption/encryption.component';
import { WebsiteDescriptionComponent } from './website-description/website-description.component';
import { ResumeComponent } from './resume/resume.component';




@Injectable()
export class XhrInterceptor implements HttpInterceptor
{
  intercept(req: HttpRequest<any>, next: HttpHandler)
  {
      const xhr = req.clone
      (
        {
          headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
        }
      );
      return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    BioComponent,
    NavbarComponent,
    ProjectPanelComponent,
    StorefrontComponent,
    ClientComponent,
    CartComponent,
    ClientloginComponent,
    StorefrontCategoriesOfferingsComponent,
    EncryptionComponent,
    WebsiteDescriptionComponent,
    ResumeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [UserService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true}, WarehouseService],
  bootstrap: [AppComponent]
})

export class AppModule { }
