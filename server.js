const express = require('express'); 
const projectRoutes = require('./projects/projectRoutes.js');
const actionRoutes = require('./actions/actionRoutes.js');

const server = express();

server.use(express.json());

server.use('/projects', projectRoutes);
server.use('/actions', actionRoutes);

server.listen(5000, () => console.log('\n== API on port 5000 ==\n'));