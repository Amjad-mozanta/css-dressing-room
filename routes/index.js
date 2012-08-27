
/*
 * GET home page.
 */

var fs = require('fs');
//var JSON = require('JSON');

exports.index = function(req, res){

	fs.readFile('views/demo-site.hjs', 'utf8', function(err, siteTemplate){

		if (err) {
			console.error("Could not open file: %s", err);
			process.exit(1);
		}

		res.render('index', {
			title: 'Express',
			siteTemplate: siteTemplate,
			fonts: [
				"Arial",
				"Arial Black",
				"Comic Sans MS",
				"Courier New",
				"Georgia",
				"Impact",
				"Tahoma",
				"Times New Roman",
				"Trebuchet MS",
				"Verdana"
			],
			colors: [
				"black",
				"#444",
				"#666",
				"#ccc",
				"#eee",
				"white",

				"#f4a",
				"#fb0",
				"#ae0",
				"#5cf"
			],
			sizes: [
				"6px",
				"8px",
				"10px",
				"12px",
				"16px",
				"18px",
				"20px",
				"24px",
				"30px",
				"36px"
			]
		});
	});
};


