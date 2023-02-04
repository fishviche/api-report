const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const { errorHandler } = require('./controllers/report.controller.js')
// Config
app.set('port', process.env.PORT || 3001);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(errorHandler)
// Routes
app.use(routes);

// Start server
app.listen(app.get('port'), () => {
  console.log('Server on port: ', app.get('port'));
})