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
		var context = { component_name: this.name }
		// Files
		var baseDir = "src/components/" + this.name + "/";
		// Html
		var htmlFile = baseDir + this.name + ".html";
		this.template("_index.html", htmlFile, context);
		// Js
		var jsFile = baseDir + this.name + ".js";
		this.template("_script.js", jsFile, context);
		// CSS
		var cssExt = this.config.get('css_ext');
		var cssFile = baseDir + this.name + "." + cssExt;
		this.template("_style." + cssExt, cssFile, context);
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
		var cssPrefix = this.config.get('css_prefix');
		var cssExt = this.config.get('css_ext');
		var cssType = this.config.get('css_type');
		// Create temp file from template
		this.fs.copyTpl(
			this.templatePath('_entry.js'),
			this.destinationPath('.tmp/entry.js'),
			{
				component_name: this.name,
				css_prefix: cssPrefix,
				css_ext: cssExt,
				css_type: cssType,
			}
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