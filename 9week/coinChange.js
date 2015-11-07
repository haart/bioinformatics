/**
 * Created by Haart on 22/12/14.
 */

var recursiveCoinChange = function recursiveCoinChange(money, coins) {
	var minNumCoins = Infinity,
		numCoins = 0,
		i = 0,
		coinsCount = coins.length;

	if (money === 0) {
		return 0;
	}

	for (; i < coinsCount; i++) {
		if (money >= coins[i]) {
			numCoins = recursiveCoinChange(money - coins[i], coins);
			if (numCoins + 1 < minNumCoins) {
				minNumCoins = numCoins + 1;
			}
		}
	}

	return minNumCoins;
};

//console.log(recursiveCoinChange(76, [5, 4, 1]));

var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	money = Number(res.shift()),
	coins = res.shift().split(',').map(Number);

var dpChange = function (money, coins) {
	var minNumCoins = [0],
		m = 1,
		i,
		coinsCount = coins.length;

	for (; m <= money; m++) {
		minNumCoins[m] = Infinity;

		for (i = 0; i < coinsCount; i++) {
			if (m >= coins[i]) {
				if (minNumCoins[m - coins[i]] + 1 < minNumCoins[m]) {
					minNumCoins[m] = minNumCoins[m - coins[i]] + 1;
				}
			}
		}
	}

	return minNumCoins[money];
};

console.log(dpChange(money, coins));