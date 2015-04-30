var bot = new RiveScript();

bot.loadFile([
	"brain/begin.rive",
	"brain/zeus.rive"
], loading_done, loading_error);

function loading_done(batch_num) {
	console.log("Batch #" + batch_num + " has finished loading.");

	bot.sortReplies();

	console.log('Brain has been loaded.');
}

function loading_error(batch_num, error) {
	console.log("Error loading files: " + error);
}