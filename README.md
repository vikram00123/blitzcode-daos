# blitzcode-daos

--app.js
  
var middleware = require('request-context').middleware;

const port = 3001

var app = express()

const routes = require('./api/routes');

app.use(middleware('namespace:currDb'));

--middleware/accesscontrol.service.js

dao.model.setConnection(res.user.companyCode ? res.user.companyCode : 'salesTeamTrackingDB');
