const Migrations = artifacts.require('Migrations');
const Documents = artifacts.require('Documents');

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Documents);
};
