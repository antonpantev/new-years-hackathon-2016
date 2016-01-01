$(document).ready(function() {
	createTiles(0x99, 0xf7, 94);

	$(window).resize(resizeUnplacedTile);
	resizeUnplacedTile();
});

function createTiles(minColor, maxColor, numTiles) {
	/* Add unplaced tiles */
	var incr = Math.round((maxColor - minColor) / (numTiles - 1));

	var colors = [];

	for(var i = 0; i < (numTiles - 1); i++) {
		colors[i] = minColor + incr*i;
	}
	
	colors[i] = maxColor;

	shuffle(colors);

	for(var i = 0; i < colors.length; i++) {
		addUnplacedTile(colors[i]);
	}

	/* Add empty placed tiles */
	$('#placed-tiles').append('<hr class="placed-tile-divider">');

	for(var i = 0; i < numTiles; i++) {
		addEmptyPlacedTile(i+1);
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