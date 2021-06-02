//validDenomination returns true if coin param is valid coin value
function validDenomination(coin) { if ([1, 5, 10, 25, 50, 100].indexOf(coin) !== -1) {return true}}
//function test
console.log(validDenomination(25));


//valueFromCoinObject(obj) return value of single coin object
function valueFromCoinObject({denom = 0, count = 0} = obj) {
    const value = denom * count;
    return value;
}
//function test
console.log(valueFromCoinObject({denom: 6, count: 3}));


//valueFromArray iterates through array of coin objects to return total value of all coins
function valueFromArray(arr) {
    return arr.reduce((accumulator, total) => accumulator + valueFromCoinObject(total), 0);
};
//test function w/ example array
let example = [ {denom: 25, count: 3}, {denom: 5, count: 5}, {denom: 10, count: 6}];
console.log(valueFromArray(example))


//coinCount function calls and returns results of valueFromArray
function coinCount(...coinage) {
    return valueFromArray(coinage);
}

//Export coinCount
module.exports = {coinCount};


//test console statements
console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
