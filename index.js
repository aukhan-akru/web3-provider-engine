const rpcWrapperEngine = require("./engine.js");
// const EthQuery = require("ethjs-query");
const Web3 = require("web3");

function creatEngine() {
   
    const engine = rpcWrapperEngine({
      rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
      privateKey: "0xca8e6ad08225592cc874008d893e2ced970cca8976acf073cca870c03f00e38e"
    });
  
    engine.on("error", (err) => {
      console.error(
        `Error in ProviderEngine: ${err.stack || err.message || err}`
      );
    });
    // return new EthQuery(engine);
    return engine;
}
  



async function getBal(){

  const provider = creatEngine();  
    const web3 = new Web3(provider)
    let a  = await web3.eth.getAccounts();
    console.log(a)
//   const balance = await ethQuery.getBalance("0xaE0443175518b16f927eEEfcDAfE0C02D23b2C99", "pending");
//   console.log("balance:::", balance.toString());

//  let a =   await ethQuery.rpc.currentProvider._providers[0].getAccounts()
// console.log("------->",a)
}

getBal()