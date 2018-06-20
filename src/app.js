import bodyParser from 'body-parser';
import express from 'express';
import faker from 'faker';

const PORT = process.env.PORT || 3000;

let web = express();
web.all('*', logRequests);
web.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

web.get('/api/history/random', function (req, res) {
  res.send({
    fullname: faker.name.findName(),
    accountHistory: faker.helpers.createCard().accountHistory,
  });
});

web.get('/api/status', function (req, res) {
  res.json({
    name: 'history-service',
    status: 200,
    message: 'healthy'
  });
});

web.use(bodyParser.json({ limit: '5mb' }));
web.use(bodyParser.urlencoded({ extended: false }));

function logRequests (req, res, next) {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`${req.method} ${req.path}`, req.body);
  }
  next();
}
