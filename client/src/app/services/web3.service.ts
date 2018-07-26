import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as Web3 from 'web3';
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  public web3: any;

  constructor() {
    this.initWeb3();
  }

  initWeb3() {
    if (typeof window.web3 !== 'undefined') {
      console.log('using ext web3');
      this.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      console.warn('no web3 detected. falling back to def env');
      this.web3 = new Web3(
        new Web3.providers.HttpProvider(environment.HttpProvider)
      );
    }
  }

  getAccounts(): Observable<any> {
    return Observable.create(observer => {
      this.web3.eth.getAccounts((error, accs) => {
        if (error) {
          console.warn('error fetching accounts');
        }
        if (accs.length == 0) {
          console.warn('ethereum client config issue');
        }
        observer.next(accs);
        observer.complete();
      });
    });
  }

  getAccount(): Observable<any> {
    return Observable.create(observer => {
      this.web3.defaultAccount((err, acc) => {
        if (err)
          console.warn('error fetching acc');
        if (acc == undefined)
          console.warn('lag');
        observer.next(acc);
        observer.complete();
      });
    });
  }

  getBalance(account) {
    return this.web3.eth.getBalance(account, function(err, result) {
      if (err) throw err;
      return result;
    });
  }

  inWei(amount) {
    return this.web3.toWei(amount, 'ether');
  }

}
