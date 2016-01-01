$(document).ready(function() {
	createTiles(0x99, 0xf7, 94);

	$(window).resize(resizeUnplacedTile);
	resizeUnplacedTile();
});

function createTiles(minColor, maxColor, numTiles) {
	/* Add unplaced tiles */
	var incr = Math.round((maxColor - minColor) / (numTiles - 1));

	for(var i = 0; i < (numTiles - 1); i++) {
		addUnplacedTile(minColor + incr*i);
	}
	
	addUnplacedTile(maxColor);

	/* Add empty placed tiles */
	$('#placed-tiles').append('<hr class="placed-tile-divider">');

	for(var i = 0; i < numTiles; i++) {
		addEmptyPlacedTile(i+1);
	}
}

function addUnplacedTile(color) {
	var colorStr = "#" + color.toString(16) + color.toString(16) + color.toString(16);

	var $unplacedTile = $('<div class="unplaced-tile"></div>');
	$unplacedTile.css("background-color", colorStr);

	$('#unplaced-tiles').append($unplacedTile);
}

function addEmptyPlacedTile(num) {
	$('#placed-tiles').append('<div class="placed-tile">' + zeroPad(num, 2) + '</div>');
	$('#placed-tiles').append('<hr class="placed-tile-divider">');
}

function zeroPad(n, p) {
	var pad = new Array(1 + p).join('0');
	return (pad + n).slice(-pad.length);
}

function resizeUnplacedTile() {
	var $tiles = $('.unplaced-tile');

	var width = $tiles.width();
	$tiles.css({'height': width + 'px'});
}