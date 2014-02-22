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

function addChatUser(username, fullname){
  var userChatProfile = Handlebars.compile($("#template-user-chat-profile").html());
  var data = {
    'username': username,
    'fullname': fullname
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
