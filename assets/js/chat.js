var $input = $('#chat-input');
var $output = $('#chat-output');

$('#chat').submit(function() {
	var $line = $('<li class="list-group-item list-group-item-info">');
	var $message = $('<span class="text">').text($input.val()).html();

	$line.append($message);
	$output.append($line);

	$output.scrollTop($output[0].scrollHeight);

	sendMessageToAlpha($input.val());

	$input.val('');

	return false;
});

function sendMessageToAlpha(message) {
	var reply = alpha.reply("local-user", message);

	outputAlphaResponse(reply);
}

function outputAlphaResponse(reply) {
	var $line = $('<li class="list-group-item list-group-item-success">');
	var $message = $('<span class="text">').text(reply).html();

	$line.append($message);
	$output.append($line);

	$output.scrollTop($output[0].scrollHeight);
}