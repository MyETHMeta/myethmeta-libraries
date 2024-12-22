import { EthereumAddressMetadataJSONSchema } from "./myethmeta-schema"

export const CONTRACT_ADDRESS = "0x63ba8dfaeba09a63c1bcb47a46229f14707af995";
const GNOSIS_RPC_URL = "https://rpc.gnosischain.com/";
const GNOSIS_CHAIN_ID = 100;

const PREFIX_GET_META_URI = '0xd7f84684000000000000000000000000'; // firs 4 bytes of keccak('getMetaURI(address)')
const PREFIX_GET_NONCE = '0x2d0335ab000000000000000000000000'; // firs 4 bytes of keccak('getNonce(address)')

enum OutputFormat {
  NUMBER,
  STRING
}

export default class MyEthMetaClient {

  private requestId = 1;

  constructor() { }

  private hexToBytes(hex: string): number[] {
    let bytes: number[] = [];
    for (let c = 0; c < hex.length; c += 2)
      bytes.push(parseInt(hex.substring(c, c + 2), 16));
    return bytes;
  }

  private async callContract(prefix: string, address: string, format: OutputFormat = OutputFormat.STRING): Promise<string | number | null> {
    const data = prefix + address.substring(2)
    const payload = {
      id: this.requestId,
      jsonrpc: "2.0",
      method: "eth_call",
      params: [
        {
          data: data,
          to: CONTRACT_ADDRESS
        }, "latest"
      ]
    }
    const response = await fetch(GNOSIS_RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    this.requestId++;
    const json_result = await response.json();
    const result = json_result.result;
    if (format == OutputFormat.NUMBER) {
      return parseInt(result, 16);
    } else {
      const result_bytes = this.hexToBytes(result.substring(2)); // cut 0x
      let result_string_bytes = result_bytes.slice(32 + 31, result_bytes.length); // cut offset (return value is always a tuple) and zeros
      const string_length = result_string_bytes.shift(); // get string length
      if (string_length == 0)
        return null;
      const string_bytes = result_string_bytes.slice(0, string_length); // get string data
      return String.fromCharCode(...string_bytes); // convert to string
    }
  }

  public getGatewayURL(uri: string) {
    if (uri.startsWith("ipfs://"))
      return "https://ipfs.io/ipfs/" + uri.substring(7);
    if (uri.startsWith("bzz://"))
      return "https://api.gateway.ethswarm.org/bzz/" + uri.substring(6);
    return uri;
  }

  public async getMetaData(address: string): Promise<EthereumAddressMetadataJSONSchema> {
    const uri = await this.callContract(PREFIX_GET_META_URI, address) as string;
    if (!uri)
      return {}
    const response = await fetch(this.getGatewayURL(uri));
    return await response.json();
  }

  public async generateDataForSigning(address: string, uri: string) {
    const nonce = await this.callContract(PREFIX_GET_NONCE, address, OutputFormat.NUMBER) as number;
    const domain = {
      name: 'MyETHMeta',
      version: '1',
      chainId: GNOSIS_CHAIN_ID,
      verifyingContract: CONTRACT_ADDRESS
    };
    const types = {
      SetMetaURI: [
        { name: 'owner', type: 'address' },
        { name: 'uri', type: 'string' },
        { name: 'nonce', type: 'uint256' }
      ]
    };
    const message = {
      owner: address,
      uri: uri,
      nonce: nonce
    };
    const eip712domain_type_definition = {
      "EIP712Domain": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "version",
          "type": "string"
        },
        {
          "name": "chainId",
          "type": "uint256"
        },
        {
          "name": "verifyingContract",
          "type": "address"
        }
      ]
    }
    const metamask_request = {
      "types": {
        ...eip712domain_type_definition,
        ...types
      },
      "primaryType": "SetMetaURI",
      domain,
      message
    };
    return { domain, types, message, metamask_request };
  }

}

