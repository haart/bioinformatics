/*
 Sample Input:
 ATGGCCATGGCCCCCAGAACTGAGATCAATAGTACCCGTATTAACGGGTGA
 MA

 Sample Output:
 ATGGCC
 GGCCAT
 ATGGCC
 */

var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	sample = res[0],
	peptide = res[1];

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
	CAA: "Q", AAA: "K", GAA: "E", CGG: "R",
	CAG: "Q", AAG: "K", GAG: "E", AGG: "R",
	UGU: "C", CGU: "R", AGU: "S", GGU: "G",
	UGC: "C", CGC: "R", AGC: "S", GGC: "G",
	CGA: "R", AGA: "R", GGA: "G", GGG: "G",
	UGG: "W", UAA: "", UAG: "", UGA: ""
};

var getComplementDNA = function (DNA) {
	var complements = {
		"A": "T",
		"T": "A",
		"C": "G",
		"G": "C"
	};

	return DNA.split('').map(function (item) {
		return complements[item]
	}).reverse().join('');
};

var transcribeDNAtoRNA = function (DNA) {
	return DNA.split('').map(function (item) {
		if (item === 'T') {
			return 'U';
		}

		return item;
	}).join('');
};

var matchPeptide = function (rna) {
	var result = '',
		j = 0;

	while (j < rna.length-2) {
		if (codons[rna.substr(j, 3)]) {
			result += codons[rna.substr(j, 3)];
		}
		j += 3;

		if (result === peptide) {
			console.log(sample.substr(i, peptideLength));
		}
	}
};

var rnaSample = transcribeDNAtoRNA(sample),
	reversedRnaSample = transcribeDNAtoRNA(getComplementDNA(sample));

var i,
	peptideLength = peptide.length * 3,
	reversedDistance = 0;

for (i = 0; i < sample.length - peptideLength - 1; i++) {
	reversedDistance = sample.length - peptideLength - i;

	matchPeptide(rnaSample.substr(i, peptideLength));
	matchPeptide(reversedRnaSample.substr(reversedDistance, peptideLength));
}