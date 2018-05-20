const sq = require('./script/mongodb-client-query');

const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); // for parsing application/json

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/lapi/getStudents', (req, res) => {
	sq.getStudents(req.param('pageIdx'), req.param('pageSize')).then(value => {
		res.send(value);
	});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
