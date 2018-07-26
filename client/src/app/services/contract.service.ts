import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Web3Service } from './web3.service';
import { ObserversModule } from '../../../node_modules/@angular/cdk/observers';

const artifacts = require('../../../../contract/build/contracts/SmartLock.json');
const contract = require('truffle-contract');

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  SmartLock = contract(artifacts);

  constructor(private web3: Web3Service) {
    this.SmartLock.setProvider(web3.web3.currentProvider);
  }

  toEther(amount) {
    return amount.c[0]/10000;
  }

  getBalance(account): Observable<any> {
    let sl;
    return Observable.create(observer => {
      this.SmartLock.deployed().then(instance => {
        sl = instance;
        return sl.getBalance.call({from: account});
      })
      .then(value => {
        observer.next(value);
        observer.next();
      })
      .catch(e => {
        console.log(e);
        observer.error(e);
      });
    });
  }

  payRent(from, to, amount): Observable<any> {
    let sl;
    return Observable.create(observer => {
      this.SmartLock.deployed().then(instance => {
        sl = instance;
        return sl.payRent(to, {from: from, value: this.web3.inWei(amount)});
      })
      .then((state) => {
        observer.next(state);
      });
    });
  }

  add(a, b): Observable<any> {
    let sl;
    return Observable.create(observer => {
      this.SmartLock.deployed().then(instance => {
        sl = instance;
        return sl.add(a, b);
      })
      .then((sum) => {
        observer.next(sum);
      });
    });
  }

}
