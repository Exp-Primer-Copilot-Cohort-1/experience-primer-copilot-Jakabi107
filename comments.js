// Create web server
// Run: node comments.js
// Note: use CTRL-C to stop server
// Note: use http://localhost:3000/ to access server from browser

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var qs = require('querystring');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  //console.log(request);
  //console.log(response);
  console.log(request.method);
  console.log(request.url);
  console.log(request.headers);
  console.log(request.httpVersion);
  console.log(request.trailers);
  console.log(request.connection);
  console.log(request.socket);
  console.log(request.client);
  console.log(request.complete);
  console.log(request.host);
  console.log(request.readable);
  console.log(request.writable);
  console.log(request.upgrade);

  if (request.method == 'POST') {
    console.log("POST");
    var body = '';
    request.on('data', function (data) {
      body += data;
      console.log("Partial body: " + body);
    });
    request.on('end', function () {
      var post = qs.parse(body);
      //console.log(post);
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end('post received');
    });
  } else {
    console.log("GET");
    var html = fs.readFileSync('index.html');
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(html);
  }
});

// Listen on port 3000, IP defaults to