function GenericWidget(config) {
	this.config = config;
	this.initializeParameters();
	this.initialize();
	this.addHandlers();
}

GenericWidget.prototype.constructor = GenericWidget;

GenericWidget.prototype.initializeParameters = function() {
	this.container = this.config.container;
}

GenericWidget.prototype.initialize = function() {
	var snippet = new Snippet( { path : this.pathSnippet , data : (this.dataSnippet != undefined) ? this.dataSnippet : [] } );
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	this.addHandlers();
}

GenericWidget.prototype.addHandlers = function() {}

GenericWidget.prototype.destroy = function() {
	$(this.node).remove();
}