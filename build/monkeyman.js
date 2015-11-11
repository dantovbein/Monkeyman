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
var MonkeymanGlobals = {
	GET_CHECKBOX_VALUE : "getCheckboxValue",
	GO_TO_NEXT_VIEW : "goToNextView"
}
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
function inheritPrototype(childObject, parentObject) {
    var copyOfParent = Object.create(parentObject.prototype);
	copyOfParent.constructor = childObject;
	childObject.prototype = copyOfParent;
}