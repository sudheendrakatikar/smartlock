import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChooseComponent } from './components/choose/choose.component';
import { PayComponent } from './components/pay/pay.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { CountdownModule } from 'ngx-countdown';

import { PlaceService } from './services/place.service';
import { Web3Service } from './services/web3.service';
import { ContractService } from './services/contract.service';
import { SpecialService } from './services/special.service';

const appRoutes: Routes = [
  {
    path: '',
    component: ChooseComponent
  },
  {
    path: 'pay/:id',
    component: PayComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ChooseComponent,
    PayComponent,
    NavbarComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    CountdownModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PlaceService, Web3Service, ContractService, SpecialService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
