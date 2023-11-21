const { ApolloServer } = require("apollo-server"); // Import the ApolloServer class from the apollo-server package
const { importSchema } = require("graphql-import"); // Import the importSchema function from graphql-import
const etherDataSource = require("./datasource/ethDataSource"); //Import the etherDataSource module
const typeDefs = importSchema("./schema.graphql"); // Import the GraphQL schema from the schema.graphql file

require("dotenv").config(); // Load environment variables from the .env file

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Get ether balance by address
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Get total ether supply
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Get latest ETH price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Get block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new etherDataSource(), // Instantiate etherDataSource
  }),
});

// Set timeout and start server
server.timeout = 0;
server.listen("9000").then(({ url }) => { // Start server on port 9000
  console.log(`🚀 Server ready at ${url}
});
