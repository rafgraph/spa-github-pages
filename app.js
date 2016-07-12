'use strict';

var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
  host: 'localhost', 
  port: 8000 
});

// Add the route
server.register(require('inert'), function (err) {
  if (err) throw err;

  server.route({
    method: 'GET',
    path:'/', 
    handler: function (request, reply) {
      reply.file('index.html');
    }
  });

  server.route({
    method: 'GET',
    path:'/__build__/bundle.js', 
    handler: function (request, reply) {
      reply.file('__build__/bundle.js');
    }
  });

  server.route({
    method: 'GET',
    path:'/__build__/bundle.js.map', 
    handler: function (request, reply) {
      reply.file('__build__/bundle.js.map');
    }
  });

  server.route({
    method: 'GET',
    path:'/styles/{filename}.css', 
    handler: function (request, reply) {
      reply.file('styles/' + request.params.filename + '.css');
    }
  });

  server.route({
    method: '*',
    path: '/{p*}', // catch-all path
    handler: function (request, reply) {
      reply.file('404.html');
    }
  });
});

// Start the server
server.start(function (err) {
  if (err) throw err;
  console.log('Server running at:', server.info.uri);
});
