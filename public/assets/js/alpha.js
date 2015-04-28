var alpha = new RiveScript();

alpha.loadFile([
	"brain/begin.rive",
	"brain/hello.rive",
	"brain/google.rive"
], loading_done, loading_error);

function loading_done(batch_num) {
	console.log("Batch #" + batch_num + " has finished loading.");

	alpha.sortReplies();

	console.log('Brain has been loaded.');
}

function loading_error(batch_num, error) {
	console.log("Error loading files: " + error);
}