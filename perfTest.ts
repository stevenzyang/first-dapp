const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const Web3 = require("web3");
const web3Utils = require('web3-utils');

// let contractAddress = "0x3Cb6aaE6F512d9aCf6AA8dE75Cd725408E18631e";
let contractAddress = "0x84FF48db44881BcD0e0cE13cE978f74a85151B7D";

const web3 = createAlchemyWeb3("https://test-eth-mainnet.alchemyapi.io/v2/MaWOiptJx3EvgsbA2_m-Wm3nV6qMyMxk");
const allStart = Date.now();
const numReqs = 3000;
function sendRequests() {
    for (let i = 0; i < numReqs; i++) {
        try {
            makeRequest();
        } catch (e) { console.log("ERROR RETURNED ", e) }
    }
    console.log(`Made ${numReqs} requests in ${(Date.now() - allStart) / 1000} seconds`);
}
sendRequests();
for (let s = 0; s < 5; s ++ ) {
    setTimeout(sendRequests, s * 1000);
}

async function makeRequest() {
    const start = Date.now();
    const result = await web3.eth.getChainId();
    const timeMs = Date.now() - start;
    console.log(`Took ${timeMs / 1000} seconds`);
}