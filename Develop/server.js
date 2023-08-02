const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); // Import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  // The `force: false` option ensures that existing data in the tables won't be dropped.
  // Set `force: true` to drop existing data and re-create the tables.
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
