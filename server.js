const axios = require("axios");
const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

let groceryList = {
  needToBuyList: [],
  inCartList: []
};

app.get("/api", (req, res) => {
  res.send(groceryList);
});

app.post("/api", (req, res) => {
  groceryList = req.body;
  res.end();
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
