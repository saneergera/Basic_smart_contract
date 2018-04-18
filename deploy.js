var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "fix slush loyal alpha suit whale skate olympic flavor tag catch patch"; // 12 word mnemonic
var provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/5K0MG6OkXRRnTkMyJFQW");

const Web3 = require('web3');
const web3 = new Web3(provider);

const {interface,bytecode} = require('./compile.js');


const deploy = async() => {

const getAccounts = await web3.eth.getAccounts();
console.log("we are deploying through ",getAccounts[0]);


const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({

            data:bytecode,
            arguments:['hello']

        })
        .send({

          from : getAccounts[0],
          gas:'1000000'



        });

  console.log("Contract deployed to ",result.options.address);

};

deploy();
