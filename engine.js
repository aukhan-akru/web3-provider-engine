const ProviderEngine = require('web3-provider-engine')
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js')
const PkHookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet-ethtx.js')
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js')
const ethUtil = require('ethereumjs-util')

module.exports = rpcWrapperEngine


function getAddress(key){
  let buffPk = ethUtil.toBuffer(key)
  const _address = ethUtil.privateToAddress(buffPk)
  return ethUtil.bufferToHex(_address)
}

function rpcWrapperEngine (opts) {
  opts = opts || {}

  var engine = opts.engine || new ProviderEngine()

  // tx signing
  var privateKey = opts.privateKey
  var addresses = [getAddress(privateKey)]

  engine.addProvider(new PkHookedWalletSubprovider({
    getAccounts: function (cb) {
      console.log("-----dsadsadasdad")
      cb(null, addresses)
    },
    //  getAccounts: function () {
    //   return addresses
    // },
    getPrivateKey: function (from, cb) {

      cb(null, privateKey)
    },
    approveTransaction: function(cb){ },
    signTransaction: function(cb){  }
  }))

  // pending nonce
  engine.addProvider(new NonceSubprovider())

  // data source
  engine.addProvider(new RpcSubprovider({
    rpcUrl: opts.rpcUrl
  }))

  // start polling
  engine.start()

  return engine
}