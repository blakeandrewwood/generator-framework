'use strict';
var fs = require('fs');
var util = require('util');
var generators = require('yeoman-generator');
// Generator
var ComponentGenerator = generators.NamedBase.extend({
	scaffoldFolders: function() {
		this.mkdir("src/components/" + this.name);
	},
	copyMainFiles: function() {
		// Context
		var context = {
			componentName: this.name
		}
		// Files
		var baseDir = "src/components/" + this.name + "/";
		var demoHtmlFile = baseDir + "demo.html";
		var htmlFile = baseDir + this.name + ".html";
		var cssFile = baseDir + this.name + ".css";
		var jsFile = baseDir + this.name + ".js";
		// Template
		this.template("_demo.html", demoHtmlFile, context);
		this.template("_index.html", htmlFile, context);
		this.template("_style.css", cssFile, context);
		this.template("_script.js", jsFile, context);
	},
	cleanupTemp: function() {
		// First cleanup from last
		fs.stat('.tmp/entry.js', function(err, stat) {
			if(err == null) {
				fs.unlink('.tmp/entry.js', function() {
					console.log('cleaned up')
				});
			}
		});
	},
	appendToWebpackEntry: function() {
		// Create temp file from template
		this.fs.copyTpl(
			this.templatePath('_entry.js'),
			this.destinationPath('.tmp/entry.js'),
			{ componentName: this.name }
		);
		// Hack: No callback on this.fs.copyTpl
		setTimeout(function() {
			fs.readFile('.tmp/entry.js', 'utf8', function(err, data) {
				if(err) {
					return console.log(err);
				}
				// Append temp file
				fs.open('src/entry.js', 'a', 666, function(e, id) {
					fs.write(id, '\r\n' + data + '\r\n', null, 'utf8', function() {
						fs.close(id, function() {
							console.log('entry.js updated.');
						});
					});
				});
			});
		}, 100);
	},
});
//Export
module.exports = ComponentGenerator;