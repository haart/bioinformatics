var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	start = res.shift(),
	text = res;

var stringSpelledByGenomePath = function (start, text) {
	var computedDna = start,
		lastPosition = start.length - 1;

	text.forEach(function (dna) {
		computedDna += dna[lastPosition];
	});

	return computedDna;
};

console.log(stringSpelledByGenomePath(start, text));