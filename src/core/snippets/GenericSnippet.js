function GenericSnippet(config) {
	this.config = config;
	this.container = this.config.container;
}

GenericSnippet.prototype.constructor = GenericSnippet;

GenericSnippet.prototype.initializeParameters = function() {}

GenericSnippet.prototype.initialize = function() {
	var snippet = new Snippet( { path : this.pathSnippet , data : (this.dataSnippet != undefined) ? this.dataSnippet : [] } );
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
}

GenericSnippet.prototype.addHandlers = function() {}