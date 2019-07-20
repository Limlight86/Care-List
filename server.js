const axios = require("axios");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.get('/api', (req, res) => {
  res.send('YOUR EXPRESS BACKEND IS CONNECTED TO REACT');
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

