const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let dataReceived = [];

app.get('/api/things', (req, res) => {
  res.status(200).send(dataReceived);
})

app.post('/api/things', (req, res) => {
  if (dataReceived.length < 10) {
    dataReceived.push(req.body);
    res.status(201).send('data pushed');
  } else {
    res.status(400).send('max limit of 10 reached');
  }
})

app.put('/api/things/:index', (req, res) => {
  if (dataReceived[req.params.index]) {
    dataReceived[req.params.index] = req.body;
    res.status(202).send();
  } else {
    res.status(405).send('No record found')
  }
})

app.delete('/api/things/:id', (req, res) => {
  if (dataReceived[req.params.id]) {
    var oldData = dataReceived[req.params.id];
    dataReceived.splice(req.params.id, 1);
  }
  res.status(200).send(oldData);
})

app.listen(3000);