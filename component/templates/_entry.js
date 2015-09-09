// <%= component_name %> Component
document.write('<h3><%= component_name %></h3>');
document.write('<section class="framework-component">');
// Component files 
require("./components/<%= component_name %>/<%= component_name %>.js");
require("!<%= css_prefix %>!<%= css_name %>!./components/<%= component_name %>/<%= component_name %>.<%= css_ext %>");
var input = require("html!./components/<%= component_name %>/<%= component_name %>.html");
document.write(input);
// Component files End 
document.write('</section>');
//