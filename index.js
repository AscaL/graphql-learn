const graphqlHttp = require('express-graphql');
const schema = require('./schema.js');

const app = require('express')();
const PORT = 5000;

app.use(
  graphqlHttp({
    schema,
    pretty: true,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
