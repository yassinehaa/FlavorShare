import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'details/:id', component: DetailsComponent },
  {path : 'home', component: HomeComponent},
];
