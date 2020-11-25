const express = require('express');
const app = express();

const routes = require('./src/routes.config');
const config = require('./src/common/env.config');

app.use(express.json());

routes.routesConfig(app);

const port = process.env.PORT || config.port;
app.listen(port, config.host, () => {
  console.log(`Listening on port ${port}...`);
});