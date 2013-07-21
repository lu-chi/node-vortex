var path = require('path');
var fs = require('fs');

// ---

function locate(location) {
	var file = location || path.join(process.cwd(), 'vortex.json');
	
	if (!fs.existsSync(file)) {
		throw new Error('vortex not found');
	}
	
	var stat = fs.statSync(file);
	
	if (stat.isDirectory()) {
		file = path.join(file, 'vortex.json');
		stat = fs.statSync(file);
	}
	
	if (!stat.isFile()) {
		throw new Error('vortex manifest does not exist');
	}
	
	return file;
}

// ---

function load(location) {
	var manifest = require(location);
	
	manifest.meta = {
		location: location,
	};
	
	return manifest;
}

// --

exports.locate = locate;
exports.load = load;