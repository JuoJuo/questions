const fs = require('fs');
const path = require('path');
const express = require('express');
const { getResult, postResult } = require('./dao/Result');
const app = express();

const data = require(path.resolve(__dirname, 'questions.json'));
const { count } = require(path.resolve(__dirname, 'count.json'));


app.use(express.json());

function random() {
  const rs = [];
  while (rs.length !== count) {
    const index = Math.ceil(Math.random() * count);

    if (rs.indexOf(index) === -1) {
      rs.push(index);
    }
  }
}

app.get('/questions', (req, res) => {
  res.json(data);
});

app.post('/answers', (req, res) => {
  console.log(req.body);
  postResult(req.body);
  res.json({ data: 'ok' });
});

app.get('/manageQuestions',async (req, res) => {
  const docs = await getResult();
  res.json(docs);
});

const port = 5689;

console.log("注意：题目数量一定要小于等于");

app.listen(port, () => {
  console.log('server started at port 5689');
});
