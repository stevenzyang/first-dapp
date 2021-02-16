const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const Web3 = require("web3");
const web3Utils = require('web3-utils');
import detectEthereumProvider from '@metamask/detect-provider';
import contractDef from '../build/contracts/Vote.json';

// let account = "0xd5E78fBa79297A369280208F7798C1447594d082";
let account = "";
// let contractAddress = "0x3Cb6aaE6F512d9aCf6AA8dE75Cd725408E18631e";
let contractAddress = "0x84FF48db44881BcD0e0cE13cE978f74a85151B7D";

document.getElementById('members').style.display = 'none'
// const web3 = createAlchemyWeb3("https://eth-goerli.alchemyapi.io/v2/o3xlcDgaZlP_qeSfY6lE8afNlsQGDGti");
const web3 = new Web3("http://127.0.0.1:7545");
let contract = new web3.eth.Contract(contractDef.abi, contractAddress);
document.addEventListener('DOMContentLoaded', async () => {
  refresh()
  if (web3) {
    document.getElementById('members').style.display = 'block'
    document.getElementById('cover').style.display = 'none'
  }
  const provider = await detectEthereumProvider()
  if (window.ethereum) {
    ethereum
      .enable()
      .then(accounts => {
        account = accounts[0];
      })
      .catch(reason => {
        console.log("Metamask error", reason)
      });
  } else {
    alert("You don't have metamask installed");
  }
})
async function refresh() {
  const memberHTMLs = [];
  const members = await contract.methods.getMembers().call();
  for (const addr of members) {
    const name = web3.utils.toAscii(await contract.methods.getMemberName(addr).call());
    console.log("name is", name);
    const vote = await contract.methods.getVoteCount(addr).call();
    console.log("vote is", vote);
    memberHTMLs.push(`<div>${name}: ${vote}
      <button class="btn btn-secondary" id="vote-${addr}" onclick="vote(this)">Vote</button>  
    </div>`);
      // document.getElementById(`v${i}`).innerHTML = result;
  };
  document.getElementById("members").innerHTML = memberHTMLs.join("");
}
async function vote(e) {
  console.log(e.id.slice(5))
  const result = await contract.methods.vote(e.id.slice(5)).send({from: account});
    console.log(result)
    refresh();
}
async function addMember(e) {
  const name = document.getElementById("add-member-name").value
  const address = document.getElementById("add-member-address").value
  console.log(name, address);
  const result = await contract.methods.addMember(address, web3Utils.fromAscii(name)).send({from: account});
  console.log(result);
  refresh();
}

window.vote = vote;
window.addMember = addMember;