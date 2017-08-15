generateAlphaNumeric = function(length) {
		let alpanumeric = '0123456789abcdefghijklmnopqrstuvwxyz'
    var result = '';
    for (var i = length; i > 0; --i) result += alpanumeric[Math.round(Math.random() * (alpanumeric.length - 1))];
    return result;
}

module.exports = generateAlphaNumeric
