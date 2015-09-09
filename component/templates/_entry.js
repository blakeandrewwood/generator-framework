// <%= componentName %> Component
document.write('<h3><%= componentName %></h3>');
document.write('<div style="background-color: #fff; padding: 20px;">');
// Component files 
var cssType = <%= cssType %>;
if(cssType === 'stylus') {
	require("!raw!stylus!./components/<%= componentName %>/<%= componentName %>.styl");
} else {
	require("!style!css!./components/<%= componentName %>/<%= componentName %>.css");
}
var input = require("html!./components/<%= componentName %>/<%= componentName %>.html");
// Component files End 
document.write(input);
document.write('</div>');
//