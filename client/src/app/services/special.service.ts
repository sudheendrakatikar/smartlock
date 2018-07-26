import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';
import { resolve } from 'url';
declare let require: any;
declare let window: any;
let tokenAbi = require('../../../../contract/build/contracts/SmartLock.json');

@Injectable({
  providedIn: 'root'
})
export class SpecialService {

  private web3Provider: null;
  private contract: {};

  constructor() {
    
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    }
    else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    window.web3 = new Web3(this.web3Provider);
  }

  getAccountInfo() {
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(function(err, account) {

        if(err === null) {
          window.web3.eth.getBalance(account, function(err, balance) {
            if(err === null) {
              return resolve({fromAccount: account, balance:window.web3.fromWei(balance, "ether")});
            } else {
              return reject("error!");
            }
          });
        }
      });
    });
  }
}
