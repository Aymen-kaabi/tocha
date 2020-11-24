import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './examples/signin/signin.component' 
import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './examples/signup/signup.component';
import { LandingComponent } from './examples/landing/landing.component';
import { ShoppingCartComponent } from './examples/shopping-cart/shopping-cart.component';
import { FeedbackComponent } from './examples/feedback/feedback.component';
import { SettingsComponent } from './examples/settings/settings.component';
import { ForgotComponent } from './examples/forgot/forgot.component';
import { SignupCompComponent } from './examples/signup-comp/signup-comp.component';
import { LandingcompComponent } from './examples/landingcomp/landingcomp.component';
import { ProfileCompComponent } from './examples/profile-comp/profile-comp.component';


const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'feedback',         component: FeedbackComponent},
    { path: 'signin',           component: SigninComponent },
    { path: 'cart',             component: ShoppingCartComponent},
    { path: 'settings',         component: SettingsComponent },
    { path: 'forgot',           component: ForgotComponent },
    { path: 'signupComp',       component: SignupCompComponent },
    { path: 'signinComp',       component: SignupCompComponent },
    {path:'landingComp',        component:LandingcompComponent},
    {path:'profileComp',        component:ProfileCompComponent}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [],
})
export class AppRoutingModule { }
