const { ApolloServer, gql } = require('apollo-server');
const mysql = require('mysql2/promise');
const express = require('express');

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
    gender: String!
  }
`;

const resolvers = {
  Query: {
    async checkPw(_, { username, password }) {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'login_page'
      });
      const [rows] = await connection.execute("SELECT * FROM user WHERE username = ? AND password = ?", [username, password]);
      return { users: rows };
    },

    async getAllUsers() {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'login_page'
      });
      const [rows] = await connection.execute('SELECT * FROM user');
      await connection.end();

      return { users: rows };
    }
  },
  Mutation: {
    async createUser(_, { input }) {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'login_page'
      });
      const [result] = await connection.execute('INSERT INTO user (username, password, gender) VALUES (?, ?, ?)', [input.username, input.password, input.gender]);
      const [user] = await connection.execute('SELECT * FROM user WHERE id = ?', [result.insertId]);
      await connection.end();

      return user[0];
    }
  }
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
app.use(express.static('public'))
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
