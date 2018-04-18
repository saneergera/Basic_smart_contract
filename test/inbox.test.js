const assert = require('assert');//re need assert module to take the assert comparison functions from it
const ganache = require('ganache-cli');//ganache is used to run a network locally on our machine one like rickby test netwrk
const Web3 = require('web3');//web 3 is a framework which is used to interact with the the blockchain network and we are copying the code in Web3
const provider = ganache.provider();//for interacting with instance of web3 we need a ganche provider
const web3 = new Web3(provider);//we will start the code and pass in the provider

const {interface,bytecode} = require('../compile');// we created a compile class tha returns a object and we took interface and bytecode from it
let accounts;
let inbox;

beforeEach(async () => {//this is th part of the code run Before each test
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();//accounts we will get all accounts associated with web 3

  inbox = await new web3.eth.Contract(JSON.parse(interface))
          .deploy({

              data:bytecode,
              arguments:['hello']

          })
          .send({

            from : accounts[0],
            gas:'1000000'



          });

  inbox.setProvider(provider);
});



describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'hello');
  });
  it('has to test message update', async () => {
    await inbox.methods.setMessage('heyb').send({

      from : accounts[0]

    });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'heyb');

  
  });
});
