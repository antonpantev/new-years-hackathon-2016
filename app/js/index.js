$(document).ready(function() {
	newGame(0x99, 0xf7, 94);

	$(window).resize(resize);
	resize();

	$('#unplaced-tiles').on('click', '.unplaced-tile', unplacedTileClick);
});

function newGame(minColor, maxColor, numTiles) {
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

	/* Add empty placed tiles and tile numbers */
	for(var i = 0; i < numTiles; i++) {
		$('#placed-tiles').append('<div class="placed-tile"><div class="drag-handle"></div></div>');

		$('#main').append('<div class="tile-number">'+zeroPad(i+1, 2)+'</div>');
	}

	$('#placed-tiles').sortable({
		handle: '.drag-handle'
	});
	$('#placed-tiles').disableSelection();
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
	var colorStr = '#' + color.toString(16) + color.toString(16) + color.toString(16);

	var $unplacedTile = $('<div class="unplaced-tile"></div>');
	$unplacedTile.css("background-color", colorStr);

	$('#unplaced-tiles').append($unplacedTile);
}

function zeroPad(n, p) {
	var pad = new Array(1 + p).join('0');
	return (pad + n).slice(-pad.length);
}

function resize() {
	var handWidth = $('.unplaced-tiles').width();
	var numTiles = $('.unplaced-tile').length;
	var tilesPerRow = 5;

	while(!willFitInHand(handWidth, numTiles, tilesPerRow)) {
		tilesPerRow++;
	}

	var tileSize = handWidth / tilesPerRow;

	var $tiles = $('.unplaced-tile');
	$tiles.css('width', 'calc('+tileSize+'px - 1%)');
	$tiles.css('height', $tiles.width());

	setTimeout(function() {
		var startY = $('#logo').position().top+$('#logo').outerHeight(true);
		var placedTileHeight = $(window).height()/10;

		$('.tile-number').each(function(i, element) {
			var top = (startY + (i*placedTileHeight)) + "px";
			$(element).css('top', top);
		});
	}, 0);
}

var percentOfHeight = 0.3;

function willFitInHand(handWidth, numTiles, tilesPerRow) {
	var tileSize = handWidth / tilesPerRow;
	var handHeight = Math.ceil(numTiles / tilesPerRow) * tileSize;
	var maxHandHeight = percentOfHeight * window.innerHeight;

	return handHeight <= maxHandHeight;
}

var nextTilePos = 0;

function unplacedTileClick() {
	var color =  $(this).css('background-color');
	$(this).remove();

	var placedTile = $($('.placed-tile')[nextTilePos]);
	placedTile.css('background-color', color);
	nextTilePos++;
}