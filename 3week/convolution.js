var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	input = '0 57 118 179 236 240 301'
		.split(' ').map(Number).sort(function (a, b) { return b - a }),
	i, j, output = {}, diff;

for (i = 0; i < input.length; i++) {
	for (j = i + 1; j < input.length; j++) {
		diff = input[i]-input[j];
		if (diff) {
			output[diff] = output[diff] + 1 || 1;
		}
	}
}

console.log(output);