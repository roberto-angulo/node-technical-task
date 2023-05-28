const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/users", (req, res) => {
  try {
    (async () => {
      await fs.readFile("../users.json", "utf8", (_, data) => {
        const users = JSON.parse(data);
        const userId = req.query.id;
        const userOutput = users.find((user) => user.id === userId);
        res.status(200).json(userOutput);
      });
    })();
  } catch (error) {
    console.error(`Error reading file from disk: ${error}`);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
