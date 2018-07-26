pragma solidity ^0.4.23;

contract SmartLock {
    address public owner;
    constructor() public {
        owner = msg.sender;
    }
    event paymentDone(address sender, address receiver, uint amount);

    function getBalance() public view returns (uint) {
        return address(msg.sender).balance;
    }
    
    function payRent(address receiver) public payable returns (uint) {
        address(receiver).transfer(msg.value);
        emit paymentDone(msg.sender, receiver, msg.value);
        return 1;
    }

    function add(uint a, uint b) public pure returns (uint) {
        return a+b;
    }
}