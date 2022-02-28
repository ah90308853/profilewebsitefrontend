import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BioComponent } from './bio/bio.component';
import { CartComponent } from './cart/cart.component';
import { ClientComponent } from './client/client.component';
import { ClientloginComponent } from './clientlogin/clientlogin.component';
import { ProjectPanelComponent } from './project-panel/project-panel.component';
import { RegisterComponent } from './register/register.component';
import { StorefrontCategoriesOfferingsComponent } from './storefront-categories-offerings/storefront-categories-offerings.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = 
[
  { path: '', redirectTo: 'storefront-categories-offerings', pathMatch: 'full' },
  { path: 'storefront-categories-offerings', component: StorefrontCategoriesOfferingsComponent },
  { path: 'clientlogin', component: ClientloginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'client', component: ClientComponent }
];
@NgModule
(
  {
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  }
)

export class AppRoutingModule { }
 