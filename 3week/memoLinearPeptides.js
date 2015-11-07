var linearPeptides = function (n) {
	var sum = 0;

	while (n > 1) {
		sum += n;
		n--;
	}

	return sum;
};

console.log(linearPeptides(22416)+2);
