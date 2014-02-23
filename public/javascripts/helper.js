function highlightChatBox(ele){
  $('.js-chat-boxes .js-user-chat-box').removeClass('activeBox');
  if(ele) ele.addClass('activeBox');
}

function userChatMinMax(ele, stat) {
  ele.each(function(i, v) {
    var userChatBox = $(this).closest('.js-user-chat-box'); //.toggleClass('minimize');
    if (userChatBox.hasClass('minimize')) {
      if (stat != 'close') {
        userChatBox.removeClass('minimize');
        $('.chat-count', userChatBox).text('').css('display', 'none');
      }
    } else {
      if (stat != 'open') {
        userChatBox.addClass('minimize');
      }
    }
  });
  highlightChatBox(ele);
}

function addChatUser(data){
  if(!data.username) return false;
  var userChatProfile = Handlebars.compile($("#template-user-chat-profile").html());
  var data = {
    'username': data.username,
    'fullname': data.username,
    'emailHash': data.emailHash
  };
  $('.js-user-ul').append(userChatProfile(data));
}

function addUserChatMsg(msg, username){
  var userChatText = Handlebars.compile($("#user-chat-text").html());
  $('ul.chats').append(userChatText({
    text: msg,
    chatClass: '',
    username: username
  }));
}

function addUserChatBox(data){
  if(!data.username) return false;
  var _thisBox = $('#user-' + data.username + ' .chat-boxes');
  if (_thisBox.length == 0) {
    var cBox = $(userChatBox(data));
    $('.chat-boxes').prepend(cBox);
    highlightChatBox(cBox);
    $('form input[type=text]', cBox).on('focus', function() {
      highlightChatBox(cBox);
    });
  } else {
    userChatMinMax(_thisBox, 'open');
    highlightChatBox(_thisBox);
  }
}