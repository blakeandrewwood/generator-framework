'use strict';
var generators = require('yeoman-generator');
// Generator
var WorkshopGenerator = generators.Base.extend({
	promptUser: function() {

		// Intro
		var welcome = 	"                           " + "\r\n" +
						"      ___        ___      " + "\r\n" +
						"     /  /\\      /__/\\    " + "\r\n" +
						"    /  /:/_    _\\_ \\:\\   " + "\r\n" +
						"   /  /:/ /\\  /__/\\ \\:\\  " + "\r\n" +
						"  /  /:/ /:/ _\\_ \\:\\ \\:\\" + "\r\n" +
						" /__/:/ /:/ /__/\\ \\:\\ \\:\\" + "\r\n" +
						" \\  \\:\\/:/  \\  \\:\\ \\:\\/:/" + "\r\n" +
						"  \\  \\::/    \\  \\:\\ \\::/ " + "\r\n" + 
						"   \\  \\:\\     \\  \\:\\/:/  " + "\r\n" +
						"    \\  \\:\\     \\  \\::/   " + "\r\n" +
						"     \\__\\/      \\__\\/    " + "\r\n" + 
						"						   " + "\r\n";

		var done = this.async();
		// Greet the user
		console.log(welcome);
		// Prompts
		var prompts = [{
			name: 'appName',
			message: 'What is your project\'s name ?',
			default: 'AmazingUI'
		}, {
			name: 'appVersion',
			message: 'Version ?',
			default: '0.0.1'
		}, {
			name: 'authorName',
			message: 'What is your name ?',
			default: 'I don\'t have one.'
		}];
		// Complete
		this.prompt(prompts, function (props) {
			this.appName = props.appName;
			this.appVersion = props.appVersion;
			this.authorName = props.authorName;
			done();
		}.bind(this));
	},
	scaffoldFolders: function() {
		this.mkdir(".tmp");
		this.mkdir("src");
		this.mkdir("src/components");
		this.mkdir("dist");
	},
	copyMainFiles: function() {
		// Main files
		this.copy("_README.md", "README.md");
		this.copy("_gulpfile.js", "gulpfile.js");
		this.copy("_webpack.config.js", "webpack.config.js");
		this.copy("_style.css", "src/style.css");
		// Context
		var context = {
			site_name: this.appName,
			site_version: this.appVersion,
			site_author: this.authorName
		};
		// Templates
		this.template("_entry.js", "src/entry.js", context);
		this.template("_package.json", "package.json", context);
		this.template("_index.html", "index.html", context);
	},
	installDependencies: function() {
		this.npmInstall([], { 'saveDev': true });
	},
	finished: function() {
		console.log('You\'re all set!');
	}
});
// Export
module.exports = WorkshopGenerator;