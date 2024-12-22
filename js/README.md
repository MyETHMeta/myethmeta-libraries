# JavaScript library for MyEthMeta

Simple, zero dependency library for accessing metadata that is attached to your Ethereum address. 
For more info, visit https://myethmeta.github.io/

## Installation

Install this package by `yarn add myethmeta`

## Usage

### Get user metadata

```javascript
const client = new MyEthMetaClient()
const metadata = await client.getMetaData(eth_address)

image.src = metadata.thumbnailUrl // show profile picture
```

### Generate EIP712 signature for metatransaction

```javascript
const client = new MyEthMetaClient()
const { domain, types, message, metamask_request } = await client.generateDataForSigning(eth_address, metadata_uri)
       

// sign by MetaMask
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
let signature = await window.ethereum.request({
    "method": "eth_signTypedData_v4",
    "params": [
        addressMetamask.value,
        metamask_request
    ]
})

// send the message and the signature to the server side
// The server will call the contract, and pay the fee  
```

## Instructions for building the library

- Run `yarn` in the root folder
- Run `yarn build` in the myethmeta folder
- Run `yarn start` in the example folder

