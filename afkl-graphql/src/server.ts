import {ApolloServer} from 'apollo-server';
import {AfklApi} from './datasources/afkl-api';
import {resolvers} from './resolvers/resolvers';
import {loadTypedefsSync} from '@graphql-tools/load';
import * as path from 'path';
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';
import {DocumentNode} from 'graphql';

const sources = loadTypedefsSync(path.join(__dirname, "schema/booking.graphql"), {
    loaders: [new GraphQLFileLoader()],
});

const typeDefs = sources.map(source => source.document) as DocumentNode[];

const server = new ApolloServer({
    cors: true,
    typeDefs,
    resolvers,
    dataSources: () => ({
        afklApi: new AfklApi()
    }),
});

// The `listen` method launches a web server.
server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
