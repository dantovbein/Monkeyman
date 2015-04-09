function GenericView(config) {
	this.config = config;
	this.initializeParameters();
	this.initialize();
	this.addHandlers();
}

GenericView.prototype.constructor = GenericView;

GenericView.prototype.initializeParameters = function() {
	this.container = this.config.container;
}

GenericView.prototype.initialize = function() {
	var snippet = new Snippet( { path : this.path , data : (this.data != undefined) ? this.data : [] } );
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
}

GenericView.prototype.addHandlers = function() {}

GenericView.prototype.destroy = function() {
	$(this.node).remove();
}

GenericView.prototype.reset = function() { }