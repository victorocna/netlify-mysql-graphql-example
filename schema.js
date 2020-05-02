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
    ID: {
      type: GraphQLString,
      resolve: ({ ID }) => ID,
    },
    display_name: {
      type: GraphQLString,
      resolve: ({ display_name }) => display_name,
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
            mysql.query("select * from wp_sandaaa_users", (err, results) => {
              return resolve(results);
            });
          });
        },
      },
    },
  }),
});

module.exports = schema;
