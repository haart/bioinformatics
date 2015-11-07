var constructBinaries = function (k) {
	var binary,
		powerOfK = Math.pow(2, k),
		i = 0, j = 0, temp;

	for (; i < powerOfK; i++) {
		binary = '';
		temp = i;
		for (j = 0; j < k; j++) {
			if (temp % 2 === 1) {
				binary = '1' + binary;
			} else {
				binary = '0' + binary;
			}
			temp = Math.ceil(temp / 2);
		}
		console.log(binary);
	}
};

constructBinaries(4);