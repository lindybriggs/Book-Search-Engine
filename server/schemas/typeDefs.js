const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    authors: [String],
    description: String!,
    bookId: String!,
    image: String,
    link: String,
    title: String!
  }

  type User {
    _id: ID,
    username: String!,
    email: String!,
    password: String!,
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getSingleUser: [User]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth,
    saveBook(bookId: String!, authors: [String], description: String!, image: String,link: String, title: String!): User,
    deleteBook(bookId: String!): User,
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
