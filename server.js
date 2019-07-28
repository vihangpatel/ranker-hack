const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const server = app.listen(process.env.PORT || 8080, () => {
	const host = server.address().address
	const port = server.address().port
	console.log(`serving at ${host} & port : ${port}`)
})