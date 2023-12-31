import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../componets/app.component';
import { HeaderComponent } from '../componets/header.component';
import { MainComponent } from '../componets/main.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FilterComponent} from "../componets/filter.component";
import {LogsComponent} from "../componets/logs.component";
import {CommunicationFactory, KafkaService, RestService} from "../services/webservice.service";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, MainComponent, FilterComponent, LogsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbDatepickerModule,
        FormsModule
    ],
  providers: [RestService, KafkaService, CommunicationFactory],
  bootstrap: [AppComponent]
})
export class AppModule { }
