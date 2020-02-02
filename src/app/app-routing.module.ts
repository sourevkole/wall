import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { homedir } from 'os';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { IsAuthorizedGuard } from './is-authorized.guard';


const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'home', component: HomeComponent, canActivate: [IsAuthorizedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
