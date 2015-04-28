var $input = $('#chat-input');
var $output = $('#chat-output');

$('#chat').submit(function() {
	var $line = $('<li class="list-group-item list-group-item-info">');
	var $message = $('<span class="text">').text($input.val()).html();

	$line.append($message);
	$output.append($line);

	$output.scrollTop($output[0].scrollHeight);

	sendMessageToAlpha($input.val());

	return false;
});

function sendMessageToAlpha(message) {
	displayBotIsResponding();

	var reply = alpha.reply("local-user", message);

	setTimeout(function() {
    	outputAlphaResponse(reply);

    	$input.val('');
    	$input.prop('disabled', false);
	}, Math.floor(Math.random() * 3000) + 500);
}

function outputAlphaResponse(reply) {	
	var $line = $('<li class="list-group-item list-group-item-success">');
	var $message = $('<span class="text">').html(reply);

	$line.append($message);
	$output.append($line);

	$output.scrollTop($output[0].scrollHeight);

	speechToText(reply);
}

function speechToText(message) {
	var msg = new SpeechSynthesisUtterance();
	msg.text = message;
	msg.lang = 'en-US';

	speechSynthesis.speak(msg);
}

function displayBotIsResponding() {
	$input.val('Alpha is processing a response...');
	$input.prop('disabled', true);
}