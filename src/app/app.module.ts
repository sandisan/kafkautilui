import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { KafkadetailsComponent } from './kafkadetails/kafkadetails.component';
import { ConnectionComponent } from './connection/connection.component'
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { TopicsComponent } from './topics/topics.component';
import { ReplicaComponent } from './replica/replica.component';
import { ReplicaresultComponent } from './replicaresult/replicaresult.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/kafkadetails', pathMatch: 'full' },
  { path: 'kafkadetails', component: KafkadetailsComponent },
  { path: 'connection', component: ConnectionComponent },
  { path: 'topics', component: TopicsComponent },
  { path: 'replica', component: ReplicaComponent },
  { path: 'replicateresult', component: ReplicaresultComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    KafkadetailsComponent,
    ConnectionComponent,
    TopicsComponent,
    ReplicaComponent,
    ReplicaresultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  schemas:[NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
