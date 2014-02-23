var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app)
var io = require('socket.io').listen(server)
var path = require('path');
var crypto = require('crypto');

var routes = require('./routes');
var user = require('./routes/user');
var chat = require('./routes/chat');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.locals.pretty = true;

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/chat', chat.index);

/*http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
*/
server.listen(3000);
io.set('loglevel', 10);
var users = {};

/* Socket-IO */
io.on('connection', function(socket) {

  io.sockets.emit('init', {
    msg: "test",
    socket_id: socket.id
  });

  socket.on('login', function(data) {

    users[data.username] = {
      username: data.username,
      email: data.email
    }

    if (users[data.username].sockets) {
      users[data.username].sockets.push(socket);
    } else {
      users[data.username].sockets = [socket];
    }

    socket.emit('loggedin', {
      id: socket.id,
      usename: data.username,
      emailHash : crypto.createHash('md5').update(data.email).digest('hex'),
      email: data.email
    });

  });

  socket.on('userChat', function(data) {


    if (users[data.to]) {
      for (var s in users[data.to].sockets) {
        users[data.to].sockets[s].emit('userChat', data);
      }
    } else {
      socket.emit('error', {
        'msg': 'no user with usernmae : ' + data.to
      });
    }
  });

});
