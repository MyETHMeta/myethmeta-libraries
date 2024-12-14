import MyEthMetaClient from "../src/index";
import { EthereumAddressMetadataJSONSchema } from "../src/myethmeta-schema";

describe('MyEthMetaClient', () => {
  
  test('getMetaData should return metadata for a valid address', async () => {
    let client = new MyEthMetaClient()
    const address = "0x5e8ba2ae8d293e73248448ebe39840aba6bd2269";
    const metadata = await client.getMetaData(address);
    console.log(metadata);
  });

});
