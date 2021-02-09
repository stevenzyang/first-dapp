const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
import detectEthereumProvider from '@metamask/detect-provider';

let contractABI = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "x",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "x",
        "type": "uint256"
      }
    ],
    "name": "getItem",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
document.getElementById('landing').style.display = 'none'
let contractAddress = "0x66c871eC4b13df8Fc99D89e952DAc0D95A2c2759";
const web3 = createAlchemyWeb3("https://eth-goerli.alchemyapi.io/v2/39r5ssBj85JmfOXuKJ25jKWy1ExIoAiQ");
let moc = new web3.eth.Contract(contractABI, contractAddress);
document.addEventListener('DOMContentLoaded', () => {
  refresh()
  if (web3) {
    document.getElementById('landing').style.display = 'flex'
    document.getElementById('cover').style.display = 'none'
  }
})
detectEthereumProvider().then(provider => {
  console.log(provider);
  if (window.ethereum) {
    ethereum
      .enable()
      .then(accounts => {
        console.log(accounts);
        // Metamask is ready to go!
      })
      .catch(reason => {
        console.log("Metamask error", reason)
      });
  } else {
    alert("You don't have metamask installed");
  }
}).catch(e => console.error(e))
const refresh = () => {
  for (let i = 0; i < 3; i++)
    moc.methods.getItem(i).call()
      .then(result => {
        document.getElementById(`v${i}`).innerHTML = result;
      })
}
function vote(e) {
  console.log(e.id[4])
  moc.methods.vote(e.id[4]).send({
    from: `0x3D5262395209eA5b9436a8Be6C75E00518F7785F`
  }).then(result => {
    console.log(result)
    refresh()
  })
}
window.web3 = web3;
window.moc = moc;
window.vote = vote;