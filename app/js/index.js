$(document).ready(function() {
	createTiles(0x99, 0xee, 13);

	$(window).resize(resizeUnplacedTile);
	resizeUnplacedTile();
});

function createTiles(minColor, maxColor, numTiles) {
	var incr = Math.round((maxColor - minColor) / (numTiles - 1));

	for(var i = 0; i < (numTiles - 1); i++) {
		addTile(minColor + incr*i);
	}
	
	addTile(maxColor);
}

function addTile(color) {
	var colorStr = "#" + color.toString(16) + color.toString(16) + color.toString(16);

	var $tile = $('<div class="unplaced-tile"></div>');
	$tile.css("background-color", colorStr);

	$('#unplaced-tiles').append($tile);
}

function resizeUnplacedTile() {
	var $tiles = $('.unplaced-tile');

	var width = $tiles.width();
	$tiles.css({'height': width + 'px'});
}