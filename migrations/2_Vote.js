const web3 = require('web3');

const vote = artifacts.require("Vote");
module.exports = function (deployer) {
    deployer.deploy(vote, web3.utils.utf8ToHex("Steven"));
};