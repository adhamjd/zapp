var express = require('express');
var bodyParser = require('body-parser');
const db = require('./db');

var app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json());

async function onSumbit(req) {
	let status = 500, data = null;

	try {
		let filename;
		let uploadPath;
		const name = req.body.name;
		const mortality = req.body.mortality;
		const deathType = req.body.deathType;
		const longitude = req.body.longitude;
		const latitude = req.body.latitude;
		const imageFile = req.body.filename;
		uploadPath = __dirname + '/upload/' + filename;
		
		
		



		console.log(req.body);
		db.query(`INSERT INTO forums (Name, Mortality ,Details, Latitude, Longitude, Image)
			VALUES ('${name}', '${mortality}', '${deathType}', '${latitude}', '${longitude}', '${imageFile}')`);
			

		status = 200;
	} catch(e) {
		console.error(e);
	}
	return {status, data};
 }

async function onGet(req) {
	let status = 500, data = null;
	try {
		data = await db.query("Select * FROM forums");
		status = 200;
	} catch(e) {
		console.error(e);
	}
	return {status, data};
	
 }



 app.post('/', async (req, res) => {
	const {status, data } = await onSumbit(req);
	res.status(status);
	if (data) res.json(data);
	return res.redirect(302, '/');
});



app.get('/sightings', async (req, res) => {
	const {status, data } = await onGet(req);
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		res.setHeader('Access-Control-Allow-Credentials', true);
		console.log(data);
		res.status(status);
		res.json(data);
		res.end();
	});

 

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Server is listening on port', port);



 





