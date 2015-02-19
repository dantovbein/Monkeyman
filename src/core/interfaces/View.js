function View(config) {
	this.config = config;
	this.container = this.config.container;
}

View.prototype.constructor = View;

View.prototype.initializeParameters = function() {}

View.prototype.initialize = function() {
	var snippet = new Snippet( { path : this.pathSnippet , data : (this.data != undefined) ? this.data : [] } );
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
}

View.prototype.addHandlers = function(){ }