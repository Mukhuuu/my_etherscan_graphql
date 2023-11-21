const { RESTDataSource } = require("apollo-datasource-rest"); // Import the RESTDataSource class from the apollo-datasource-rest package

//Vitalik's Ethereum Address
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

// Define the EtherDataSource class as a subclass of RESTDataSource
class EtherDataSource extends RESTDataSource {
  constructor() {
    super();
    // Set the base URL for API requests to Etherscan
    this.baseURL = "https://api.etherscan.io/api";
  }

  // Fetch the Ethereum balance for the specified address
  async etherBalanceByAddress() {
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Fetch the total supply of Ethereum
  async totalSupplyOfEther() {
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Fetch the latest Ethereum price
  async getLatestEthereumPrice() {
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Fetch the estimated block confirmation time
  async getBlockConfirmationTime() {
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

// Export the EtherDataSource class for use in other modules
module.exports = EtherDataSource;
