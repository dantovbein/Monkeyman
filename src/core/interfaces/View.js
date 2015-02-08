function View(config) {
	this.config = config;
	this.container = this.config.container;
}

View.prototype.constructor = View;

View.prototype.initialize = function() {
	var snippet = new Snippet( { container : this.container , data : (this.data != undefined) ? this.data : [] } );
	this.node = $.parseHTML(snippet.getSnippet());
}

View.prototype.appendNode = function() {
	this.container.append(this.node);
}