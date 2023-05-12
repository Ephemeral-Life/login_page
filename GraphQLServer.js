const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const typeDefs = gql`
  type Query {
    checkPw(username: String!, password: String!): Users
    getAllUsers: Users
  }
  
  type User {
    id: ID
    username: String
    password: String
  }
  type Users {
    users: [User]
  }

  type Mutation {
    createUser(input: CreateUserInput): User
  }
  input CreateUserInput {
    username: String!
    password: String!
  }
`;

const resolvers = {
  Query: {
    async checkPw(_, { username, password }) {
      const users = await prisma.user.findMany({
        where: {
          username: username,
          password: password,
        },
      });
      return { users };
    },

    async getAllUsers() {
      const users = await prisma.user.findMany();
      return { users };
    }
  },
  Mutation: {
    async createUser(_, { input }) {
      const user = await prisma.user.create({
        data: {
          username: input.username,
          password: input.password,
        },
      });
      return user;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
