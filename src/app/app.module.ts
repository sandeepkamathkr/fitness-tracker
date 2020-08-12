import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material.module";
import {WelcomeComponent} from './welcome/welcome.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {StopTrainingComponent} from "./training/current-training/stop-training.component";
import {AuthService} from "./auth/auth.service";
import {TrainingService} from "./training/training.service";
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from "../environments/environment";
import {UIService} from "./shared/ui.service";
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule
  ],
  entryComponents: [StopTrainingComponent],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
