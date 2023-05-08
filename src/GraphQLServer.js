const express = require('express');
const {buildSchema} = require('graphql');
const graphqlHTTP = require('express-graphql').graphqlHTTP;

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
    hello: () => {
        return 'hello world'
    }
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.use(express.static('public'))
app.listen(4000);