$(document).ready(function() {
	createTiles(0x99, 0xf7, 14);

	$(window).resize(resizeTiles);
	resizeTiles();
});

function createTiles(minColor, maxColor, numTiles) {
	var incr = Math.round((maxColor - minColor) / (numTiles - 1));

	var colors = [];

	for(var i = 0; i < (numTiles - 1); i++) {
		colors[i] = minColor + incr*i;
	}
	
	colors[i] = maxColor;

	shuffle(colors);

	for(var i = 0; i < colors.length; i++) {
		addTile(colors[i]);
	}
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	/* While there remain elements to shuffle */
	while (0 !== currentIndex) {
		/* Pick a remaining element */
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		/* And swap it with the current element. */
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function addTile(color) {
	var colorStr = "#" + color.toString(16) + color.toString(16) + color.toString(16);

	var $tile = $('<div class="tile"></div>');
	$tile.css("background-color", colorStr);

	$('#tiles').append($tile);
}

function resizeTiles() {
	var $tiles = $('.tile');

	var width = $tiles.width();
	$tiles.css({'height': width + 'px'});
}