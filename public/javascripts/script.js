var userChatBox = Handlebars.compile($("#user-chat-box").html());
var socket = io.connect();

$('div.user-list').on('click', 'ul li', function() {
  /*var _thisBox = $('#user-' + $(this).data('username'), '.chat-boxes');
  if (_thisBox.length == 0) {
    var cBox = $(userChatBox($(this).data()));
    $('.chat-boxes').prepend(cBox);
    highlightChatBox(cBox);
    $('form input[type=text]', cBox).on('focus', function() {
      highlightChatBox(cBox);
    });
  } else {
    userChatMinMax(_thisBox, 'open');
    highlightChatBox(_thisBox);
  }*/
  addUserChatBox($(this).data());
});


$('.js-chat-boxes').on('click', '.js-user-chat-minimize', function(e) {
  e.preventDefault();
  userChatMinMax($(this));
});


$('.js-chat-boxes').on('click', '.js-close-chat-box', function(e) {
  e.preventDefault();
  $(this).closest('.js-user-chat-box').remove();
});


$('.js-chat-boxes').on('submit', '.js-send-chat', function(e) {
  e.preventDefault();
  var msg = $('[name=msg]', this);
  var parentBox = $(this).closest('.js-user-chat-box');
  var chats = $('ul.chats', parentBox);
  var to = parentBox.data('username');

  socket.emit('userChat', {
    'msg': msg.val(),
    'to': to
  });

  /*chats.append(userChatText({
    text: msg.val(),
    chatClass: 'myself',
    username: parentBox.data('username')
  }));
  $('ul.chats').not(chats).append(userChatText({
    text: msg.val(),
    chatClass: '',
    username: parentBox.data('username')
  }));*/

  msg.val('');

  $('ul.chats').each(function() {
    var _thisParentBox = $(this).closest('.js-user-chat-box');
    if (_thisParentBox.hasClass('minimize')) {
      var chatCount = $('.chat-count', _thisParentBox);
      var chatCountVal = parseInt(chatCount.text());
      if (!chatCountVal) chatCountVal = 0;
      chatCount.text(++chatCountVal).css('display', 'block');
    }
  });

});


$('.user-list').on('click', '.js-chat-toggle-sign', function(e) {
  e.preventDefault();
  console.log('123');
  var _this = $(this);
  var userList = _this.closest('.user-list');
  userList.toggleClass('minimize');
});


for (var i = 1; i <= 10; i++) {
  addChatUser({
    username: 'user-' + i,
    fullname: 'User ' + i,
    emailHash: '#'
  });
}

$('.login-box').on('submit', 'form', function(e){
  e.preventDefault();
  var _this = $(this);
  var username = $('[name=username]', _this);
  var email = $('[name=email]', _this);

  socket.emit('login', {
    'username': username.val(),
    'email': email.val()
  });

});

/* Socket work */
socket.on('userChat', function(data) {
  console.log(data);
});

socket.on('init', function(data) {
  console.log(data);
});

socket.on('loggedin', function(data) {
  addUserChatBox(data);
  $('.login-box').fadeOut();
  $('div.chat-page').fadeIn();
  addChatUser(data);
});

socket.on('error', function(data){
  alert('error - ' + data.msg);
});













