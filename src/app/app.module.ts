import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminhomeComponent } from './home/adminhome/adminhome.component';
import { UserhomeComponent } from './home/userhome/userhome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth/auth.guard';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { SignupComponent } from './home/signup/signup.component';
import { AcceptedComponent } from './home/adminhome/accepted/accepted.component';
import { PendingComponent } from './home/adminhome/pending/pending.component';
import { RejectedComponent } from './home/adminhome/rejected/rejected.component';
import { HouselistingComponent } from './home/userhome/houselisting/houselisting.component';
import { CensusregisterComponent } from './home/userhome/censusregister/censusregister.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { PendinguserComponent } from './home/userhome/pendinguser/pendinguser.component';
import { RejecteduserComponent } from './home/userhome/rejecteduser/rejecteduser.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StatsComponent } from './home/adminhome/stats/stats.component';
import { ChartsModule } from 'ng2-charts';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminhomeComponent,
    UserhomeComponent,
    HeaderComponent,
    SignupComponent,
    AcceptedComponent,
    PendingComponent,
    RejectedComponent,
    HouselistingComponent,
    CensusregisterComponent,
    ForbiddenComponent,
    PendinguserComponent,
    RejecteduserComponent,
    StatsComponent,
    NotfoundComponent
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
    apiKey: "AIzaSyDhfWEeo4TWoZk7q6K_wd_DsgNelobhRbU",
    authDomain: "demoproject-1287a.firebaseapp.com",
    projectId: "demoproject-1287a",
    storageBucket: "demoproject-1287a.appspot.com",
    }),
      AngularFireModule,
      AngularFireStorageModule,
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
