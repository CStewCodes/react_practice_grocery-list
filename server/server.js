// declare dependencies- express, dotenv, pg,
const express = require("express");
const app = express();
const port = 3005;
const { Pool } = require("pg");
const dotenv = require("dotenv");
const cors = require("cors");

//declare middleware
//config dotenv
dotenv.config();
app.use(express.json());
app.use(cors());

//config pool
const pool = new Pool({ connectionString: process.env.CONNECTION_STRING });

// ****** ROUTING *******

//------defaut route-----
app.get("/", (req, res) => {
  res.send("Connected");
});

//-----get all songs-----
app.get("/songs", (req, res) => {
  pool.query("SELECT * FROM songs;").then((result) => {
    res.send(result.rows);
  });
});

//--------get song by ID-------
app.get("/songs/:id", (req, res) => {
  pool
    .query(`SELECT * FROM songs WHERE id= ${req.params.id}`)
    .then((result) => {
      res.send(result.rows[0]);
    });
});

//----- Add a song to the playlist -----
app.post("/songs", (req, res) => {
  let { song_name, artist, album } = req.body;
  pool
    .query(
      `INSERT INTO songs (song_name, artist, album) VALUES ($1, $2, $3) RETURNING *`,
      [song_name, artist, album]
    )
    .then((result) => {
      res.send(`You've created your new song! Here's the details: ${result.rows}`);
      console.log(`New song added: ${result.rows}`);
    })
    .catch((err) => {
      res.status(500).send(err.message);
      console.log(err);
    });
});

//------- Update a Song------
app.patch("/songs/:id", (req, res) => {
  let { song_name, artist, album } = req.body;
  pool
    .query(
      `UPDATE songs SET song_name = COALESCE($1, song_name), artist=COALESCE($2, artist), album=COALESCE($3, album) WHERE id = ${req.params.id} RETURNING *`,
      [song_name, artist, album]
    )
    .then((result) => {
      res.send(result.rows);
      console.log(result.rows);
    })
    .catch((err) => {
      res.status(500).send(err.message);
      console.log(err);
    });
});

//----delete a song------
app.delete("/songs/:id", (req, res) => {
  pool
    .query(`DELETE FROM songs WHERE id = ${req.params.id} RETURNING *`)
    .then((result) => {
      res.send(`The song ${result?.rows[0].song_name} has been deleted.`);
      console.log(
        `${result?.rows[0].song_name} and it's data has been deleted.`
      );
    })
    .catch((err) => {
      res.status(500).send(err.message);
      console.log(`${err} something went wrong!`);
    });
});

//add listener
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
