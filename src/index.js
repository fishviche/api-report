const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const { errorHandler } = require('./middlewares/error.handler.js')
// Config
app.set('port', process.env.PORT || 3001);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// Routes
app.use(routes);

//  Handle error
app.use(errorHandler);
// Start server
app.listen(app.get('port'), () => {
  console.log('Server on port: ', app.get('port'));
})