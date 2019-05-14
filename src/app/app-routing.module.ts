import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { UserhomeComponent } from './home/userhome/userhome.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminhomeComponent } from './home/adminhome/adminhome.component';
import { PendinguserComponent } from './home/userhome/pendinguser/pendinguser.component';
import { RejecteduserComponent } from './home/userhome/rejecteduser/rejecteduser.component';
import { NotfoundComponent } from './notfound/notfound.component';


import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'approver', component: AdminhomeComponent, canActivate: [AuthGuard], data: { roles: 'True' }},
    { path: 'user', component: UserhomeComponent, canActivate: [AuthGuard], data: { roles: 'False', status:'Approved' }},
    { path: 'rejected', component: RejecteduserComponent, canActivate: [AuthGuard], data: {  roles: 'False', status:'Declined' }},
    { path: 'pending', component: PendinguserComponent, canActivate: [AuthGuard], data: {  roles: 'False', status:'Pending' }},
    { path: 'login', component: LoginComponent,},
    { path:'forbidden', component:ForbiddenComponent, canActivate: [AuthGuard]},
    { path : '', redirectTo:'login', pathMatch : 'full'},
     { path: '**', component: NotfoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  
 }
