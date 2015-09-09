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
	setConfigVariables: function() {
		this.config.set('project_name', this.projectName);
		this.config.set('project_version', this.projectVersion);
		this.config.set('author_name', this.authorName);
		if(this.useStylus) {
			this.config.set('css_prefix', 'raw');
			this.config.set('css_name', 'stylus');
			this.config.set('css_ext', 'styl');
		} else {
			this.config.set('css_prefix', 'style');
			this.config.set('css_name', 'css');
			this.config.set('css_ext', 'css');
		}
		this.config.save();
	},
	scaffoldFolders: function() {
		this.mkdir(".tmp");
		this.mkdir("src");
		this.mkdir("src/components");
		this.mkdir("dist");
	},
	copyMainFiles: function() {
		var projectName = this.config.get('project_name');
		var projectVersion = this.config.get('project_version');
		var authorName = this.config.get('author_name');
		var cssPrefix = this.config.get('css_prefix');
		var cssExt = this.config.get('css_ext');
		var cssName = this.config.get('css_name');
		// Main files
		this.copy("_README.md", "README.md");
		this.copy("_gulpfile.js", "gulpfile.js");
		this.copy("_webpack.config.js", "webpack.config.js");
		this.copy("_style." + cssExt , "src/style." + cssExt);
		// Context
		var context = {
			site_name: projectName,
			site_version: projectVersion,
			site_author: authorName,
			css_prefix: cssPrefix,
			css_ext: cssExt,
			css_name: cssName,
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