var Server = require('node-static').Server;
var create = require('http').createServer;
var browserify = require('browserify');
var del = require('del');
var fs = require('fs');
var path = require('path');
var file = new Server(__dirname);

// Create HTTP server.
create(function(req, res) {
  req.on('end', function() {
    file.serve(req, res);
  }).resume();
}).listen(8080, '127.0.0.1', function() {
  console.log('HTTP server started on http://localhost:8080/');
});

// Package with Browserify
del(['out.js']);
var write = fs.createWriteStream(path.join(__dirname, '/out.js'));
var build = browserify([path.join(__dirname, 'page.js')]);
build.bundle().pipe(write).on('end', function() {
  console.log('Browserify finished');
});
