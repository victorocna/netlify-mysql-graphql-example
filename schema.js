const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const mysql = require("./connect");

const Hello = new GraphQLObjectType({
  name: "hello",
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: ({ id }) => id,
    },
    name: {
      type: GraphQLString,
      resolve: ({ name }) => name,
    },
  }),
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLList(Hello),
        resolve: async () => {
          return new Promise((resolve) => {
            mysql.query("select * from hello", (err, results) => {
              return resolve(results);
            });
          });
        },
      },
    },
  }),
});

module.exports = schema;
