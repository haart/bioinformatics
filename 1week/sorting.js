/**
 * Created by Haart on 29/10/14.
 */

var array = [4, 2, 1, 5, 10, 4];

var bubbleSort = function (array) {
	var arrLength = array.length - 1,
		swapped,
		temp = 0,
		i;

	do {
		swapped = false;
		for (i = 0; i < arrLength; i++) {
			if (array[i] > array[i + 1]) {
				temp = array[i];
				array[i] = array[i + 1];
				array[i + 1] = temp;
				swapped = true;
			}
		}
	} while (swapped);

	return array;
};

console.log(bubbleSort(array));