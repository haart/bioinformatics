var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	text = res.shift(),
	k = Number(res.shift()),
	d = Number(res.shift());

var pairedComposition = function (text, k, d) {
	var pairs = [],
		i = 0;

	for (; i <= text.length - 2*k - d; i++) {
		pairs.push([text.substr(i, k), text.substr(i+k+d, k)]);
	}

	return pairs;
};

console.log(pairedComposition(text, k, d).sort(function (a, b) { if (a[0] > b[0]) return 1; else return -1; }).map(function (el) { return '(' + el[0] + '|' + el[1] + ')'}).join(' '));