var res = require('fs').readFileSync(process.argv[2], {encoding: 'utf-8'}).split('\n');

var string1 = 'CAGAAAGGAAGGTCCCCATACACCGACGCACCAGTTTA',
	string2 = 'CACGCCGTATGCATAAACGAGCCGCACGAACCAGAGAG',
	distance = 0;

string1.split('').forEach(function (element, index) {
	if (element !== string2[index]) {
		distance++
	}
});

console.log(distance);