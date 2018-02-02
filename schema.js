require('es6-promise').polyfill();
require('isomorphic-fetch');

const {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');

const Author = new GraphQLObjectType({
  name: 'Author',
  fields: {
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    company: {
      type: GraphQLString,
    },
  },
});

const Post = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLInt },
    author: {
      type: Author,
      resolve: subTree => {
        // Get the AuthorId from the post data
        const authorId = subTree.author.split('/')[1];
        return fetch('http://www.mocky.io/v2/594a3bd21000006d021aa3ac')
          .then(response => response.json())
          .then(authors => authors[authorId]);
      },
    },
    categories: { type: new GraphQLList(GraphQLString) },
    publishDate: { type: GraphQLString },
    summary: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    title: { type: GraphQLString },
  },
});

const Blog = new GraphQLObjectType({
  name: 'Blog',
  fields: {
    posts: {
      type: new GraphQLList(Post),
      resolve: () => {
        return fetch('http://www.mocky.io/v2/594a3ac810000053021aa3a7').then(response =>
          response.json()
        );
      },
    },
  },
});

// The GraphQLSchema is the root-level export of a GraphQL — the starting point for queries to traverse the graph. In this basic example, we are only defining the query; this is where you would define mutations (writes) and subscriptions
module.exports = new GraphQLSchema({
  query: Blog,
});
