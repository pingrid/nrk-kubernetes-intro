const express = require('express');
const logger = require('winston');
const app = express();
const port = 5000;
const { education, work, me } = require('./data');

app.get('/', (request, response) => {
	response.send(`Hello, I'm alive`);
	logger.info('Responded to GET request on /')
});

app.get('/api/me', (request, response) => {
	logger.info('Responded to GET request on /api/me');
	response.send(JSON.stringify(me));
});

app.get('/api/work', (request, response) => {
	logger.info('Responded to GET request on /api/work');
	response.send(JSON.stringify({ work }));
});

app.get('/api/education', (request, response) => {
	logger.info('Responded to GET request on /api/edu');
	response.send(JSON.stringify({ education }));
});

app.listen(port, (err) => {
  if (err) {
    return logger.error('something bad happened', err)
  }
  logger.info(`server is listening on ${port}`)
});
