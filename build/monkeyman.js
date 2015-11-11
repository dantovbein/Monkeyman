(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Monkeyman = {
	version : "1.0.13",
	setMain : function(main){
		this.main = main;
	},
	getMain : function(){
		return this.main;
	},
	getClass : function(instance){
		// TODO return a new Instance for a specific Class
	},
	customEvent : function(data){
		var type = data.type;
		var details = (data.details) ? data.details[0] : {};
		if(document.addEventListener) { // The rest
  			var evt = new CustomEvent(type, { 'detail': details } );
  			data.elem.dispatchEvent(evt);
		} else if (document.attachEvent) { // IE
			var evt = document.createEvent("Event");
			evt.initEvent(type, true, false);
			data.elem.dispatchEvent(evt);
		}
	},
	addZero : function(value) {
		return (value < 10) ? "0" + parseFloat(value) : parseFloat(value);
	},
	getMonths : function(){
		return [ { es: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"] } ];
	},
	getMonthId : function(month,type){
		var arrType = [];
		switch(type){
			case "es": 
				arrType = this.getMonths()[0].es; 
			break;
		}
		var id = -1;
		arrType.forEach(function(m,i){
			if(m.toLocaleLowerCase() == month.toLocaleLowerCase()){
				id = i;
			}
		});
		return id;
	},
	defaultTo : function(value,defaultTo) {
		return (value) ? value : defaultTo;
	},
	validateEmail : function(email) { 
    	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(email);
	},
	setHeight : function(wrapper) {
		var tempHeight = 0;
		var childrens = $(wrapper).children().length;
		for(var i=0; i<childrens; i++){
			var child = $(wrapper).children()[i];
			tempHeight += $(child).height();
		}	
		$(wrapper).css({
			height : tempHeight
		})
	},
	isLoading : function(message) {
		this.getOverlay();
		this.getPreloader(message);
	},
	stopLoading : function() {
		this.removePreloader();
		this.removeOverlay();
	},
	getOverlay:function(){
		var overlay = document.createElement("div");
		overlay.setAttribute("id", "overlay");
		overlay.setAttribute("class", "overlay");
    	document.body.appendChild(overlay);
    	overlay.style.width = document.body.scrollWidth + "px";
		overlay.style.height = document.body.scrollHeight + "px";
	},
	removeOverlay:function(){
		if(document.getElementById("overlay")){
			var overlay = document.getElementById("overlay");
			overlay.remove();
		}else{
			return false;
		}
	},
	getPreloader : function(message){
		this.getOverlay();
		
		var preloader = document.createElement("div");
		preloader.setAttribute("id", "preloader");
		preloader.setAttribute("class", "preloader");

		var preloaderIcon = document.createElement("div");
		preloaderIcon.className = "preloader-icon";
		preloader.appendChild(preloaderIcon);

		var preloaderText = document.createElement("span");
		preloaderText.className = "preloader-text";
		preloaderText.innerHTML = (message != undefined) ? message : "Cargando";
		preloader.appendChild(preloaderText);
		
		document.body.appendChild(preloader);
		preloader.style.top = (window.innerHeight / 2 - preloader.offsetHeight / 2) + "px";
	},
	removePreloader : function(){
		this.removeOverlay();
		if(document.getElementById("preloader")){
			var preloader = document.getElementById("preloader");
			preloader.remove();
		}else{
			return false;
		}
	},
	removePopup : function(e) {
		this.removeOverlay();
		if($(".popup").length > 0) {
			$(".popup").remove();
		}
	},
	highlightButton : function(element,context,className){
		var child;
		for(var i=0; i<context.children().length; i++){
			child = context.children()[i];
			
			if($(child).hasClass(className)){
				$(child).removeClass(className);
			}
		}
		$(element).addClass(className);
	}
}
},{}],2:[function(require,module,exports){
var MonkeymanGlobals = {
	GET_CHECKBOX_VALUE : "getCheckboxValue",
	GO_TO_NEXT_VIEW : "goToNextView"
}
},{}],3:[function(require,module,exports){
function Snippet(config) {
	this.config = config;
	this.configuration();
};

Snippet.prototype.constructor = Snippet;

Snippet.prototype.configuration = function() { };

Snippet.prototype.getSnippet = function() {
	var self = this;
	var element;
	jQuery.ajax({
		async : false,
       	url:    this.config.path,
       	success: function(result) {
        	element = self.render(String(result),self.config.data);
        },
        error : function(error){
        	debugger;
        }
    });          
	return element;
};

Snippet.prototype.render = function(_snippet_,data) {
	var self = this;
	var snippet = _snippet_;
	data.forEach(function(d,i){
		var patt = "[" + i + "]";
		snippet = snippet.replace(patt,d);		
	});
	return snippet;
};
},{}],4:[function(require,module,exports){
function inheritPrototype(childObject, parentObject) {
    var copyOfParent = Object.create(parentObject.prototype);
	copyOfParent.constructor = childObject;
	childObject.prototype = copyOfParent;
}
},{}],5:[function(require,module,exports){
// package core
var oop = require('./oop.js');
var Snippet = require('./Snippet.js');
var Monkeyman = require('./Monkeyman.js');
var MonkeymanGlobals = require('./MonkeymanGlobals.js');
var GenericSnippet = require('./snippets/GenericSnippet.js');
var GenericNav = require('./snippets/nav/GenericNav.js');
var Popup = require('./snippets/popup/Popup.js');
var GenericWidget = require('./widgets/GenericWidget.js');
var GenericCheckbox = require('./widgets/GenericCheckbox.js');
var GenericView = require('./views/GenericView.js');

},{"./Monkeyman.js":1,"./MonkeymanGlobals.js":2,"./Snippet.js":3,"./oop.js":4,"./snippets/GenericSnippet.js":6,"./snippets/nav/GenericNav.js":7,"./snippets/popup/Popup.js":8,"./views/GenericView.js":9,"./widgets/GenericCheckbox.js":10,"./widgets/GenericWidget.js":11}],6:[function(require,module,exports){
function GenericSnippet(config) {
	this.config = config;
	this.initializeParameters();
	this.initialize();
	this.addHandlers();
}

GenericSnippet.prototype.constructor = GenericSnippet;

GenericSnippet.prototype.initializeParameters = function() {
	this.container = this.config.container;
	this._name = (this.config.name) ? this.config.name : "";
	this.path = (this.config.path) ? this.config.path : "";
}

GenericSnippet.prototype.initialize = function() {
	var snippet = new Snippet( { path : this.path , data : (this.dataSnippet != undefined) ? this.dataSnippet : [] } );
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
}

GenericSnippet.prototype.addHandlers = function() {}

GenericSnippet.prototype.destroy = function() {
	$(this.node).remove();
}
},{}],7:[function(require,module,exports){
function GenericNav(config){
	this.config = config;
}

GenericNav.prototype.constructor = GenericNav;
},{}],8:[function(require,module,exports){
function Popup(config) {
	GenericSnippet.call(this,config);
}

inheritPrototype(Popup,GenericSnippet);

Popup.prototype.constructor = Popup;

Popup.prototype.initializeParameters = function() {
	GenericSnippet.prototype.initializeParameters.call(this);
}

Popup.prototype.addHandlers = function() {
	GenericSnippet.prototype.addHandlers.call(this);
}

Popup.prototype.onClosePopup = function() {}
},{}],9:[function(require,module,exports){
function GenericView(config) {
	this.config = config;
	this.initializeParameters();
	this.initialize();
	this.addHandlers();
}

GenericView.prototype.constructor = GenericView;

GenericView.prototype.initializeParameters = function() {
	this.container = this.config.container;
	this._name = (this.config.name) ? this.config.name : "";
	this.path = (this.config.path) ? this.config.path : "";
}

GenericView.prototype.initialize = function() {
	var snippet = new Snippet( { path : this.path , data : (this.dataSnippet != undefined) ? this.dataSnippet : [] } );
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
}

GenericView.prototype.addHandlers = function() {}

GenericView.prototype.destroy = function() {
	$(this.node).remove();
}

GenericView.prototype.reset = function() { }
},{}],10:[function(require,module,exports){
function GenericCheckbox(config){
	GenericWidget.call(this,config);
}

inheritPrototype(GenericCheckbox,GenericWidget);

GenericCheckbox.prototype.constructor = GenericCheckbox;

GenericCheckbox.prototype.initializeParameters = function(){
	GenericWidget.prototype.initializeParameters.call(this);
}

GenericCheckbox.prototype.initialize = function(){
	GenericWidget.prototype.initialize.call(this);
	this.setState(0);
}

GenericCheckbox.prototype.addHandlers = function(){
	GenericWidget.prototype.addHandlers.call(this);
	$(this.node).click({ context:this },this.onClickHandler );
}

GenericCheckbox.prototype.onClickHandler = function(e){
	var self = e.data.context;
	self.state = (self.state==0) ? 1 : 0;
	self.setState(self.state);
	$(self).trigger({ type:MonkeymanGlobals.GET_CHECKBOX_VALUE, checkbox:self });
}

GenericCheckbox.prototype.setState = function(value){
	this.state = value;
	if($(this.node).hasClass("disabled")) $(this.node).removeClass("disabled");
	if($(this.node).hasClass("enabled")) $(this.node).removeClass("enabled");
	if(this.state == 0){
		$(this.node).addClass("disabled");
	} else {
		$(this.node).addClass("enabled");	
	}
}

GenericCheckbox.prototype.getState = function(){
	return this.state;
}
},{}],11:[function(require,module,exports){
function GenericWidget(config) {
	this.config = config;
	this.initializeParameters();
	this.initialize();
	this.addHandlers();
}

GenericWidget.prototype.constructor = GenericWidget;

GenericWidget.prototype.initializeParameters = function() {
	this.container = this.config.container;
	this._name = (this.config.name) ? this.config.name : "";
	this.path = (this.config.path) ? this.config.path : "";
}

GenericWidget.prototype.initialize = function() {
	var snippet = new Snippet( { path : this.path , data : (this.dataSnippet != undefined) ? this.dataSnippet : [] } );
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
}

GenericWidget.prototype.addHandlers = function() {}

GenericWidget.prototype.destroy = function() {
	$(this.node).remove();
}
},{}]},{},[5]);
