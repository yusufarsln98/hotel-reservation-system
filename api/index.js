/* eslint-disable no-console */

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());

let db;

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { user, password } = req.body;
  try {
    db = mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user,
      password,
      database: 'hotelreservationsystem',
    });

    db.connect((err) => {
      if (err) {
        res.status(401).send(err);
        return;
      }
      res.status(200).send('Authenticated');
    });
  } catch (error) {
    res.status(401).send('Authentication failed');
  }
});

// check if user is logged in
app.get('/isAuth', (req, res) => {
  if (!db) {
    res.status(401).send('Not authenticated');
    return;
  }
  res.status(200).send('Authenticated');
});

// logout
app.post('/logout', (req, res) => {
  if (!db) {
    db = null;
  } else {
    db.end((err) => {
      if (err) {
        res.status(400).send('Error logging out');
        return;
      }
      db = null;
    });
  }

  db = null;
  res.status(200).send('Logged out');
});

// POST methodu ile SQL sorgusu alma ve çalıştırma
app.post('/query', (req, res) => {
  if (!db) {
    res.status(401).send('Not authenticated');
    return;
  }

  const sqlQuery = req.body.query;

  db.query(sqlQuery, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
