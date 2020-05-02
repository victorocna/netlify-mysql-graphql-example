require("dotenv").config();
const express = require("express");
// const mysql = require("mysql");
const serverless = require("serverless-http");
const app = express();

const graphqlHTTP = require("express-graphql");
const schema = require("../schema");
// const mysql = require("../connect");
const mysql = require('../connect')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function getHello(id) {
  return new Promise((resolve, reject) => {
    const sql = "select * from hello where id=?";
    mysql.query(sql, [id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

const router = express.Router();
router.get("test", (req, res) => {
  res.status(200).send("hello world");
});
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const hello = await getHello(id);
    res.status(200).json(hello);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/graphql", graphqlHTTP({ schema }));

app.use("/.netlify/functions/app", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
