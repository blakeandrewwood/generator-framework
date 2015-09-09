// <%= component_name %> Component
document.write('<h3><%= component_name %></h3>');
document.write('<div style="background-color: #fff; padding: 20px;">');
// Component files 
require("./components/<%= component_name %>/<%= component_name %>.js");
require("!<%= css_prefix %>!<%= css_name %>!./components/<%= component_name %>/<%= component_name %>.<%= css_ext %>");
var input = require("html!./components/<%= component_name %>/<%= component_name %>.html");
// Component files End 
document.write(input);
document.write('</div>');
//