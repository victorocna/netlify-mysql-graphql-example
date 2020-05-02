require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let cachedDbPool;
function getDbPool() {
  if (!cachedDbPool) {
    cachedDbPool = mysql.createPool({
      connectionLimit: 1,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    });
  }
  return cachedDbPool;
}

async function getHello(id) {
  return new Promise((resolve, reject) => {
    const sql = "select * from hello where id=?";
    getDbPool().query(sql, [id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

app.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const hello = await getHello(id);
    res.status(200).json(hello);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(4000, () => {
  console.log("app started on 4000");
});
