/**
*	Framework generated main entry.js
*	
*	Generate new components by:	
*	yo framework:component "name"
*	
*	Edit components in their encapsulated
*	folder, webpack will update and display them.
*		
*	View README for more information.		
*/

// Main style sheet and normalization
require("!<%= css_prefix %>!<%= css_name %>!./style.<%= css_ext %>");
var htmlIncludes = require("html!../index-css.html");
document.write(htmlIncludes);
document.write("<h2><%= site_name %></h2>");

/** -----------------------------------------------------
*	Generated Components
* -------------------------------------------------- */
