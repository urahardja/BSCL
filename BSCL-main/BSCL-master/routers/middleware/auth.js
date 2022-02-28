'use strict';
const { auth } = require('firebase-admin');

exports.authentication = (req, res, next) => {
  const header = req.headers['authorization'];
  const token = header && header.split('Bearer ')[1];

  if (!token)
    return res.status(401).send({ status: 'Error', message: 'Token required' });

  auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.headers['decodedToken'] = decodedToken;
      next();
    })
    .catch(() =>
      res.status(401).send({ status: 'Error', message: 'Invalid token' })
    );
};

exports.authorization = (role) => (req, res, next) => {
  const header = req.headers['decodedToken'];
  if (!header || role !== header.role)
    return res
      .status(403)
      .send({ status: 'Error', message: 'Unauthorized access' });
  next();
};
