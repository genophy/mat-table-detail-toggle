const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const uuidv1 = require('uuid/v1');

MongoClient.connect(url, function(err, db) {
  if (err) {
    throw err;
  }
  var dbo = db.db('exam');
  dbo.collection('students').insertMany(getManyCollections(), function(err, res) {
    if (err) {
      throw err;
    }
    console.log('插入的文档数量为: ' + res.insertedCount);
    db.close();
  });
});

const getManyCollections = function() {
  let res = [];
  for (let i = 1; i <= 1000; i++) {
    res.push({
      name : 'No.' + i,
      age  : Math.round(20 + Math.random() * 10),
      score: Math.round(Math.random() * 100),
      code : uuidv1(),
    });
  }
  return res;
};
