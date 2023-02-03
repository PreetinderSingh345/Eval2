const express = require('express');

const app = express();
const port = (process.env.PORT || 3000);

const apiRouter = require('./routers/api');

app.use(express.json());
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('We have a request at the root');
});

app.listen(port, () => {
  console.log(`The server is listening on port : ${port}`);
});