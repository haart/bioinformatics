var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	k = Number(res.shift()),
	text = res.shift();

var composition = function (text, k) {
	var kmers = [],
		i = 0;

	for (; i <= text.length - k; i++) {
		kmers.push(text.substr(i, k));
	}

	return kmers.sort();
};

console.log(composition(text, k).join('\n'));