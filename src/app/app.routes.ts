import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HeroComponent} from './components/hero/hero.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: HeroComponent},
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: "**", redirectTo: "404", pathMatch: "full"}
]
