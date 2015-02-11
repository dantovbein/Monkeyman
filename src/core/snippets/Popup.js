function Popup(config) {
	GenericSnippet.call(this,config);
}

inheritPrototype(Popup,GenericSnippet);

Popup.prototype.constructor = Popup;

Popup.prototype.addHandlers = function() {
	GenericSnippet.prototype.addHandlers.call(this);
}

Popup.prototype.onClosePopup = function() {}