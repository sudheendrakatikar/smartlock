import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { PlaceService } from '../../services/place.service';
import { Web3Service } from '../../services/web3.service';
import { ContractService } from '../../services/contract.service';
import { Place } from '../../Place';
import { state } from '../../../../node_modules/@angular/animations';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styles: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  account: any;
  balance: number;
  id: number;
  name: string;
  place: Place;
  lock: boolean = true;
  occupied: any;
  dialogRef: MatDialogRef<DialogComponent>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private dialog: MatDialog,
    private placeService: PlaceService,
    private web3: Web3Service,
    private contract: ContractService
  ) { 
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.occupied = localStorage.getItem('occupied');
  }

  ngOnInit() {
    
    this.placeService.getPlace(this.id)
      .subscribe(data => {
        this.place = data;
      });

    this.web3.getAccounts()
      .subscribe(accs => {
        this.account = accs[0];
      }, err => alert(err)
    );

    this.ngZone.run(() => {
      this.contract.getBalance(this.account)
        .subscribe(value => {
          if (value != undefined)
            this.balance = this.contract.toEther(value);
        }, e => { 
        });
    });  
  }

  ngOnDestroy() {
    
  }

  loggedIn() {
    if (this.occupied == null)
      return false;
    else
      return true;
  }

  payRent() {
    this.contract.payRent(this.account, this.place.owner_id, this.place.rent)
      .subscribe(state => {
        console.log(state);
      });
      this.placeService.blockPlace(this.id).subscribe(data => { });
      this.lock = false;
      localStorage.setItem('occupied', JSON.stringify(this.id));
  }

  timerFin() {
    this.lock = true;
    this.placeService.freePlace(this.id).subscribe(data => {});
    localStorage.removeItem('occupied');
    this.openDialog();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(DialogComponent);
  }

}