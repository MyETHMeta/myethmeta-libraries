import MyEthMetaClient, { CONTRACT_ADDRESS } from "myethmeta";
import { BrowserProvider, Contract } from 'ethers';

declare global {
    interface Window {
        ethereum?: any;
    }
}

if (!window.ethereum || !window.ethereum.isMetaMask) {
    alert("Please install MetaMask")
}

let client = new MyEthMetaClient();

document.addEventListener("DOMContentLoaded", () => {
    const getMetadataButton = document.getElementById("get-metadata-button");
    const connectMetamaskButton = document.getElementById("connect-metamask-button");
    const writeMetadataButton = document.getElementById("write-metadata-button");
    const addressInput = document.getElementById("address") as HTMLInputElement;
    const resultDiv = document.getElementById("metadata-result");
    const addressMetamask = document.getElementById("address_metamask") as HTMLInputElement;
    const metadataUrlInput = document.getElementById("metadata_url") as HTMLInputElement;

    getMetadataButton?.addEventListener("click", async () => {
        const address = addressInput.value || "";
        const metadata = await client.getMetaData(address);
        if (resultDiv)
            resultDiv.innerHTML = "<pre>" + JSON.stringify(metadata, null, 2) + "</pre>";
    });

    connectMetamaskButton?.addEventListener("click", async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                if (addressMetamask) {
                    addressMetamask.value = account;
                }
            } catch (error) {
                console.error("Error connecting to MetaMask", error);
            }
        } else {
            console.error("MetaMask is not installed");
        }
    });

    writeMetadataButton?.addEventListener("click", async () => {
        const { domain, types, message, metamask_request } = await client.generateDataForSigning(addressMetamask.value, metadataUrlInput.value)
        let signature = await window.ethereum.request({
            "method": "eth_signTypedData_v4",
            "params": [
                addressMetamask.value,
                metamask_request
            ]
        })
        console.log("Signature:", signature);

        try {
            const contractABI = [
                'function setMetaURIMetaTX(address owner, string uri, uint256 nonce, bytes signature) public'
            ];
            const provider = new BrowserProvider(window.ethereum)
            const signer = await provider.getSigner();
            const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);
            const tx = await contract.setMetaURIMetaTX(message.owner, message.uri, message.nonce, signature);
            await tx.wait();
            console.log('Transaction confirmed');
        } catch (error) {
            console.error('Error calling setMetaURIMetaTX:', error);
        }
    });
});
