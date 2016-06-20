if (parseInt(process.versions.node.split('.')[0]) < 6) {
	console.warn('Refused to load ES6 version because of Node version lower than 6.');
	module.exports = require('./lib-es5/proto.js');
} else {
	module.exports = require('./lib-es6/proto.js');
}
