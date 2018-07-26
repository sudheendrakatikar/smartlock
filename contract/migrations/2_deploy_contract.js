var SmartLock = artifacts.require('../contracts/SmartLock.sol');
module.exports = function(deployer) {
    deployer.deploy(SmartLock);
}