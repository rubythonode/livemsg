const express = require('express');
const app = express();
const cors = require('cors');
const JSON = require('JSON');
const bodyParser = require('body-parser');
const redis = require("redis"),
        client = redis.createClient();
const PORT = "7005";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

client.select(0);

client.on("error", function (err) {
    console.log("Error " + err);
});

// 추가
// ZADD section1 0 testaaa

// 조회
// ZRANGE section1 0 -1 withscores

// 좋아요
// ZINCRBY section1 1 testaa


// CORS 설정
app.use(cors());

app.get('/timeline', (req, res) => {
  console.log('get request');
  client.zrange("section1", 0, -1, 'WITHSCORES', function (err, obj) {
      if (err) throw(err);
      console.dir(obj);
      res.send(obj);
  });
});

app.post('/writePost', (req, res) => {
  console.log('post request');
  console.log(req.body);
  client.zadd("section1", 0, req.body.msg, function (err, obj) {
      if (err) throw(err);
      res.send('succ');
  });
});

app.listen(PORT, () => {
  console.log('server listening on port %s!', PORT);
});