const path = require('path');
const fs = require('fs');
const sol= require('solc');

const inbox = path.resolve(__dirname,'contracts','inbox.sol');
const source = fs.readFileSync(inbox,'utf8');
module.exports = sol.compile(source,1).contracts[':Inbox'] ;
