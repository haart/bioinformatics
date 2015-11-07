var fs = require('fs');

var codons = {
	UUU: "F", CUU: "L", AUU: "I", GUU: "V",
	UUC: "F", CUC: "L", AUC: "I", GUC: "V",
	UUA: "L", CUA: "L", AUA: "I", GUA: "V",
	UUG: "L", CUG: "L", AUG: "M", GUG: "V",
	UCU: "S", CCU: "P", ACU: "T", GCU: "A",
	UCC: "S", CCC: "P", ACC: "T", GCC: "A",
	UCA: "S", CCA: "P", ACA: "T", GCA: "A",
	UCG: "S", CCG: "P", ACG: "T", GCG: "A",
	UAU: "Y", CAU: "H", AAU: "N", GAU: "D",
	UAC: "Y", CAC: "H", AAC: "N", GAC: "D",
	UAA: "",  CAA: "Q", AAA: "K", GAA: "E",
	UAG: "",  CAG: "Q", AAG: "K", GAG: "E",
	UGU: "C", CGU: "R", AGU: "S", GGU: "G",
	UGC: "C", CGC: "R", AGC: "S", GGC: "G",
	UGA: "",  CGA: "R", AGA: "R", GGA: "G",
	UGG: "W", CGG: "R", AGG: "R", GGG: "G"
};

var result = '',
	res = fs.readFileSync('res', {encoding: 'utf-8'}),
	i = 0;

while (i < res.length-2) {
	if (codons[res.substr(i, 3)]) {
		result += codons[res.substr(i, 3)];
	}
	i = i + 3;
}

console.log(result);