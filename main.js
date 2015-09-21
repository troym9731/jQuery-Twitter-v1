var User = {
	handle: '@bradwestfall',
	img: 'images/brad.png'
};

var tmpl1 = $('#template-tweet').html();
var tweetTmpl = Handlebars.compile(tmpl1);

var tmpl2 = $('#template-compose').html();
var composeTmpl = Handlebars.compile(tmpl2);

var tmpl3 = $('#template-thread').html();
var threadTmpl = Handlebars.compile(tmpl3);


var renderTweet = function(User, message) {
	User.msg = message;
	return tweetTmpl(User);
};

var renderCompose = function() {
	return composeTmpl();
};

var renderThread = function(User, message) {
	var tweetTmpl = renderTweet(User, message);
	var composeTmpl = renderCompose();

	var obj ={
		tweet: tweetTmpl,
		compose: composeTmpl
	};

	return threadTmpl(obj);
};

$(function() {

	var composeSelector = '.compose';
	var $main = $('main');
	var $tweets = $('.tweets');

	$main.on('click', 'textarea', function() {
		$(this).closest(composeSelector).addClass('expand');
	});

	$main.on('click', '.tweet', function() {
		$(this).closest('.thread').toggleClass('expand');
	});

	$main.on('click', 'button', function() {
		var $textarea = $(this).closest(composeSelector).find('textarea');
		var message = $textarea.val();

		if (message === '') {
			return false;
		}

		if ($(this).parents().is('header')) {
			var thread = renderThread(User, message);
			$tweets.append(thread);
		} else {
			var tweet = renderTweet(User, message);
			$(this).closest('.replies').append(tweet);
		}

		$textarea.val('');
		$(this).closest(composeSelector).removeClass('expand');
		$(this).closest(composeSelector).find('.count').text(140);

		return false;

	});

	$('main').on('keyup', 'textarea', function() {
		var $span = $(this).closest(composeSelector).find('.count');
		var i = $(this).val().length;
		var newCount = 140 - i;
		var $button = $(this).closest(composeSelector).find('button');
		
		if (newCount <= 0) {
			$span.text(0);
			$span.addClass('red');
			$(this).addClass('red');
			$button.attr('disabled', true);
		} else {
			$span.text(newCount);
			$span.removeClass('red');
			$(this).removeClass('red');
			$button.attr('disabled', false)
		}

	});

});