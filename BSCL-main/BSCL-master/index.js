'use strict';
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const firebase = require('firebase-admin');

firebase.initializeApp({
  credential: firebase.credential.applicationDefault()
});

const app = express();
app.use(cors());
require('./routers')(app);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}..`);
});
