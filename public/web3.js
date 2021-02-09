let contractABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "last_completed_migration",
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
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "completed",
          "type": "uint256"
        }
      ],
      "name": "setCompleted",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
document.getElementById('landing').style.display = 'none'
let contractAddress = "0x6A2c6C25631C278063fD9827041faE59d020b666";
let web3 = new Web3('http://127.0.0.1:9545/');
let moc = new web3.eth.Contract(contractABI, contractAddress);
document.addEventListener('DOMContentLoaded', () => {
    refresh()
    if (web3) {
        document.getElementById('landing').style.display = 'flex'
        document.getElementById('cover').style.display = 'none'
    }
})
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
        from: `0xa843ccd815c940de51db8f063ad1d18c0bfe95f5`
    }).then(result => {
        console.log(result)
        refresh()
    })
}