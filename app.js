const express = require("express");
const connectDB = require("./database/database");
const Events = require("./models/Event");
const app = express();
const routes = require("./apis/events/routes");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(routes);
const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});
