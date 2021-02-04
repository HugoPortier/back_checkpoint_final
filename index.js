const express = require("express");
const mysql = require("./db");
const { SERVER_PORT } = require("./env");
const cors =require("cors")
const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json("stay a while listen...");
});

app.get('/getState', (req, res) => {
  mysql.query("SELECT * from checkpoint_final", (err, results) => {
    if (err) {
        console.log("errrrrrrr", err);
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).send(results);
    }
  });
});

app.post("/postState", (req, res) => {
  const { pseudo, point } = req.body;
  mysql.query("INSERT INTO checkpoint_final set ?", req.body, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving a potion");
    } else {
      res.status(200).send("Successfully saved");
    }
  });
});

app.delete("/getState", (req, res) => {
  const idPseudo = req.params.id;
  mysql.query("DELETE FROM checkpoint_final ", [idPseudo], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting an pseudo");
    } else {
      res.status(200).send("pseudo deleted!");
    }
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`server is listening on ${SERVER_PORT}`);
});
