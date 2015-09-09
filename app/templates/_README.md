# framework 
A simple environment setup to being rapid protyping of your framework.
This generator is still a work in progress.

## Installation
Install yeoman, framework, and webpack 

	$ npm install -g yo generator-framework webpack

Run
	$ yo framework

Follow the instructions for setup!

## Usage
Generate new components by:	

	$ yo framework:component "name"

Each component you make wil be encapsulated in it's own folder
located in `src/components/` which contains a `html`, `css`, and `js` file.

Start the webpack server:
	
	$ webpack-dev-server

Go to `http://localhost:8080/webpack-dev-server/bundle` 
and begin creating your framework's components!