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

	var reply = bot.reply("local-user", message);

	setTimeout(function() {
    	outputAlphaResponse(reply);

    	$input.val('').prop('disabled', false).focus();
	}, Math.floor(Math.random() * 0) + 500);
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
	var utterance = new SpeechSynthesisUtterance(message);
	var voiceArr = speechSynthesis.getVoices();
	console.log(voiceArr);
	utterance.voice = voiceArr[1];
	utterance.pitch = 2;

	speechUtteranceChunker(utterance, {
    	chunkLength: 120
	});
}

function displayBotIsResponding() {
	$input.val('Alpha is processing a response...');
	$input.prop('disabled', true);
}

function speechUtteranceChunker(utt, settings, callback) {
	settings = settings || {};
	    var chunkLength = settings && settings.chunkLength || 160;
	    var pattRegex = new RegExp('^.{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[\.\!\?\,]{1}|^.{1,' + chunkLength + '}$|^.{1,' + chunkLength + '} ');
	    var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
	    var chunkArr = txt.match(pattRegex);

	    if (chunkArr[0] !== undefined && chunkArr[0].length > 2) {
	        var chunk = chunkArr[0];
	        var newUtt = new SpeechSynthesisUtterance(chunk);
	        for (x in utt) {
	            if (utt.hasOwnProperty(x) && x !== 'text') {
	                newUtt[x] = utt[x];
	            }
	        }
	        newUtt.onend = function () {
	            settings.offset = settings.offset || 0;
	            settings.offset += chunk.length - 1;
	            speechUtteranceChunker(utt, settings, callback);
	        }

	        console.log(newUtt); //IMPORTANT!! Do not remove
	        
	        setTimeout(function () {
	            speechSynthesis.speak(newUtt);
	        }, 0);
	    } else {
	        if (callback !== undefined) {
	            callback();
	        }
	    }
}