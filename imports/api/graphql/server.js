
import {Meteor} from 'meteor/meteor';
import {createApolloServer} from 'meteor/apollo';
import {makeExecutableSchema,addMockFunctionsToSchema} from 'graphql-tools';
import schema from './schema.js';
import resolvers from './resolvers.js';




const executableSchema=makeExecutableSchema({
  typeDefs:schema,
  resolvers:resolvers,
  allowUndefinedInResolve:false,
  printErrors:true
});

createApolloServer({
    schema:executableSchema,
});