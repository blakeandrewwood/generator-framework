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
			name: 'projectName',
			message: 'What is your project\'s name ?',
			default: 'AmazingUI'
		}, {
			name: 'projectVersion',
			message: 'Version ?',
			default: '0.0.1'
		}, {
			name: 'authorName',
			message: 'What is your name ?',
			default: 'I don\'t have one.'
		}, {
            type: 'confirm',
            name: 'useStylus',
            message: 'Would you like to write css in Stylus ?',
            default: true
        }];
		// Complete
		this.prompt(prompts, function (props) {
			this.projectName = props.projectName;
			this.projectVersion = props.projectVersion;
			this.authorName = props.authorName;
			this.useStylus = props.useStylus;
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
		if(this.useStylus) {
			this.copy("_style.styl", "src/style.styl");
		} else {
			this.copy("_style.css", "src/style.css");
		}
		// Context
		var context = {
			site_name: this.projectName,
			site_version: this.projectVersion,
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
	addConfigFile: function() {
		this.config.set('project_name', this.projectName);
		this.config.set('project_version', this.projectVersion);
		this.config.set('author_name', this.authorName);
		this.config.set('use_stylus', this.useStylus);
		this.config.save();
	},
	finished: function() {
		console.log('You\'re all set!');
	}
});
// Export
module.exports = WorkshopGenerator;