import { Component, OnInit, NgZone } from '@angular/core';
import { Web3Service } from '../../services/web3.service';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  accounts: any;
  account: any;
  receiver: string;
  amount: number;
  constructor(
    private web3: Web3Service,
    private contract: ContractService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.web3.getAccounts()
      .subscribe(accs => {
        this.accounts = accs;
        this.account = this.accounts[0];
        this.ngZone.run(() => {
          this.refreshBalance();
        });
      }, err => alert(err)
    );
  }

  refreshBalance() {

  }

  clicker() {
    //alert(this.account+'\n'+this.receiver+'\n'+this.amount);
    //this.web3.transferEther(this.account, this.receiver, this.amount);
    this.contract.payRent(this.account, this.receiver, this.amount);
  }

}
