// A - T
// C - G

var res = require('fs').readFileSync(process.argv[2], {encoding: 'utf-8'}).split('\n');

//var strand = res[0];

var strand = 'ATGT';
var complements = {
	"A": "T",
	"T": "A",
	"C": "G",
	"G": "C"
};

console.log(strand.split('').map(function(item) {return complements[item]}).reverse().join(''));