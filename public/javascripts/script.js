var userChatBox = Handlebars.compile($("#user-chat-box").html());
var userChatText = Handlebars.compile($("#user-chat-text").html());

$('div.user-list').on('click', 'ul li', function() {
  $('.chat-boxes').append(userChatBox($(this).data()));
});
$('.js-chat-boxes').on('click', '.js-user-chat-minimize', function(e) {
  e.preventDefault();
  var userChatBox = $(this).closest('.js-user-chat-box'); //.toggleClass('minimize');
  if(userChatBox.hasClass('minimize')){
    userChatBox.removeClass('minimize');
    $('.chat-count', userChatBox).text('').css('display', 'none');
  }else{
    userChatBox.addClass('minimize');
  }
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
  chats.append(userChatText({
    text: msg.val(),
    chatClass: 'myself',
    username: parentBox.data('username')
  }));
  $('ul.chats').not(chats).append(userChatText({
    text: msg.val(),
    chatClass: '',
    username: parentBox.data('username')
  }));
  msg.val('');
  $('ul.chats').each(function(){
    var _thisParentBox = $(this).closest('.js-user-chat-box');
    if(_thisParentBox.hasClass('minimize')){
      var chatCount = $('.chat-count', _thisParentBox);
      var chatCountVal = parseInt(chatCount.text());
      if(!chatCountVal) chatCountVal = 0;
      chatCount.text(++chatCountVal).css('display', 'block');
    }
  })
});
