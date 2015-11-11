(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function ItemLargeDescription(config){
	ItemList.call(this,config);
	this.pathSnippet = (this.config.pathSnippet) ? this.config.pathSnippet : "../../src/ui/list-gallery/snippets/item-large-description.html";
	this.dataSnippet = [ this.config.data.id, this.config.data.title, this.config.data.value ];
}
inheritPrototype(ItemLargeDescription,ItemList);

ItemLargeDescription.prototype.constructor = ItemLargeDescription;

ItemLargeDescription.prototype.updateSize = function() {
	ItemList.prototype.updateSize.call(this);
	for(var i=0; i<this.childrens; i++){
		var child = $(this.node).find(".wrapper-data").children()[i];
		this.tempWrapperDataHeight += $(child).height();
	}
	$(this.node).find(".wrapper-data").css({
		height : this.tempWrapperDataHeight
	});
}
},{}],2:[function(require,module,exports){
function ItemList(config){
	this.config = config;
	this.container = this.config.container;
	this.itemWidth = this.config.itemWidth
	this.itemHeight = this.config.itemHeight;
}

ItemList.prototype.constructor = ItemList;

ItemList.prototype.initialize = function() {
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : this.dataSnippet });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	$(this.node).css( { "width" : this.itemWidth,
						"height" : this.itemHeight });
}

ItemList.prototype.updateSize = function() {
	this.tempHeight = $(this.node).height();
	this.childrens = $(this.node).find(".wrapper-data").children().length;
	this.tempWrapperDataHeight = 0;
}

ItemList.prototype.destroy = function() {
	$(this.node).remove()
}
},{}],3:[function(require,module,exports){
function ItemPicture(config){
	ItemList.call(this,config);
	this.pathSnippet = (this.config.pathSnippet) ? this.config.pathSnippet : "../../src/ui/list-gallery/snippets/item-picture.html";
	this.dataSnippet = [ this.config.data.id, this.config.data.image, this.config.data.value ];
}
inheritPrototype(ItemPicture,ItemList);

ItemPicture.prototype.constructor = ItemPicture;
},{}],4:[function(require,module,exports){
function ItemShortDescription(config){
	ItemList.call(this,config);
	this.pathSnippet = (this.config.pathSnippet) ? this.config.pathSnippet : "../../src/ui/list-gallery/snippets/item-short-description.html";
	this.dataSnippet = [ this.config.data.id, this.config.data.title, this.config.data.value ];
}
inheritPrototype(ItemShortDescription,ItemList);

ItemShortDescription.prototype.constructor = ItemShortDescription;

ItemShortDescription.prototype.updateSize = function() {
	ItemList.prototype.updateSize.call(this);
	for(var i=0; i<this.childrens; i++){
		var child = $(this.node).find(".wrapper-data").children()[i];
		this.tempWrapperDataHeight += $(child).height();
	}
	$(this.node).find(".wrapper-data").css({
		height : this.tempWrapperDataHeight
	});
}
},{}],5:[function(require,module,exports){
function ListGallery(config) {
	this.config = config;
	this.container = this.config.container;
	this.pathSnippet = "../../src/ui/list-gallery/snippets/list-gallery.html";
	this.items = [];
	this.lastItemHeight = 0;
	this.itemWidth = 200;
	this.itemHeight = 230;
	this.padding = 10;
	this.itemsToAdd = 0;
}

ListGallery.prototype.constructor = ListGallery;

ListGallery.prototype.initialize = function() {
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [] });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	$( window ).resize({ context:this },this.onResizeComponent);
}

ListGallery.prototype.onResizeComponent = function(e){
	e.data.context.arrange();
}

ListGallery.prototype.addNewItemByType = function(d) {
	var data = {  	container:$(this.node).find(".list-gallery"),
					pathSnippet:this.getItem(d.type),
					itemWidth:this.itemWidth,
					itemHeight:this.itemHeight,
					dataChild:$(this.node).find(".list-gallery li").length
				};
	var itemList = this.getItem( { type:d.type, data:data });
	itemList.initialize();
	this.items.push(itemList);
	this.arrange();
}

ListGallery.prototype.addNewItem = function(d) {
	var data = {  	container:$(this.node).find(".list-gallery"),
					itemWidth:this.itemWidth,
					itemHeight:this.itemHeight,
					data:d
				};
	var itemList = this.getItem( { type:d.type, data:data });
	itemList.initialize();
	this.items.push(itemList);
	this.arrange();
}

ListGallery.prototype.getItem = function(d) {
	switch(d.type) {
		case 1:
			return new ItemPicture(d.data);
			break;
		case 2:
			return new ItemShortDescription(d.data);
			break;
		case 3:
			return new ItemLargeDescription(d.data);
			break;
	}				
}

ListGallery.prototype.addItems = function(dataSource) {
	this.removeAll();

	dataSource.forEach(function(d){
		this.addNewItem(d);
	},this);
}

ListGallery.prototype.addItemsByNumber = function(itemsToAdd) {
	this.removeAll();

	if(itemsToAdd==0)
		return false;

	this.itemsToAdd = itemsToAdd;
	for(var i=0;i<this.itemsToAdd;i++){
		var itemList = new ItemList( { container:$(this.node).find(".list-gallery"),itemWidth:this.itemWidth,itemHeight:this.itemHeight,dataChild:$(this.node).find(".list-gallery li").length });
		itemList.initialize();
		this.items.push(itemList);
	}

	this.arrange();
}

ListGallery.prototype.removeItem = function() {
	if(this.items.length==0)
		return false;

	var lastItem = this.items[this.items.length-1];
	lastItem.destroy()
	this.items.splice(this.items.length-1,1);
	
	this.arrange();
}

ListGallery.prototype.removeAll = function() {
	$.each(this.items,function(index,item){
		item.destroy();
	});
	this.items = [];
}

ListGallery.prototype.arrange = function() {
	var containerHeight = $(this.node).height();
	var containerWidth = $(this.node).width();

	this.newSize = this.getNewItemSize();
	var tempItemWidth = Math.floor(this.newSize.w);
	var tempItemHeight = Math.floor(this.newSize.h);
	
	this.items.forEach(function(item,index){
		$(item.node).css({
 			"width" : tempItemWidth,
 			"height" : tempItemHeight
 		});
 		this.tempItem = item;
	},this);
	
	var totalItems = $(this.node).find(".list-gallery li").length;
	var maxRows = Math.floor($(this.node).height() / tempItemHeight);
	var maxColumns = (totalItems%maxRows==0) ? totalItems/maxRows : (totalItems-(totalItems%maxRows))/maxRows+1;
	var listWidth = tempItemWidth*maxColumns;
	var listHeight = tempItemHeight*maxRows;
	var gapW = containerWidth - listWidth;
	var gapH = containerHeight - listHeight;
	var minGap = Math.min(gapW,gapH);
	var minSize = (minGap==gapW) ? listWidth : listHeight;
	var side = (minSize==listWidth) ? containerWidth : containerHeight;
	var scale = (minGap==0) ? 1 : side/minSize;
	//console.log("gapW:",gapW,"gapH:",gapH,"minGap:",minGap,"minSize:",minSize,"scale:",scale);

	$(this.node).find(".list-gallery").css({
		width : listWidth,
		left : containerWidth / 2 - listWidth / 2,
		top : containerHeight / 2 - listHeight / 2,
		'-webkit-transform' : 'scale(' + scale + ')',
		'-moz-transform'    : 'scale(' + scale + ')',
		'-ms-transform'     : 'scale(' + scale + ')',
		'-o-transform'      : 'scale(' + scale + ')',
		'transform'         : 'scale(' + scale + ')'
	});
	this.tempItem.updateSize();
}

ListGallery.prototype.getNewItemSize = function() {
	var newScale = this.getNewScale($(this.node).height() * 1 / (this.itemHeight ) );
	var newSize = this.getNewSize(newScale);
	var newSurface = this.getNewSurface(newSize);
	var itemsInSurface = this.getAvailableSpace() / newSurface;
	
	if(itemsInSurface < 1) {
		newScale = this.getNewScale(newScale);
		newSize = this.getNewSize(newScale);
	}	
	return newSize;
}

ListGallery.prototype.getNewScale = function(newScale) {
	var newSize = this.getNewSize(newScale);
	var newSurface = this.getNewSurface(newSize);
	var itemsInSurface = this.getAvailableSpace() / newSurface;
	var hasNewScale = false;
	if(itemsInSurface > 1) {
		var size = this.getNewSize(newScale);
		var rows = 1;
		var listWidth = 0;
		
		this.items.forEach(function(item,index){
			if( (listWidth + size.w) < $(this.node).width()){
				listWidth += size.w;				
			} else {
				listWidth = size.w;
				rows++;
			}
		},this);
		
		if( (rows * size.h) > $(this.node).height() ) {
			var columns = Math.ceil( $(this.node).width()/size.w );
			var tempWidth = $(this.node).width() / columns;
			var tempScale = tempWidth * newScale / size.w;
			var tempColumns = Math.ceil($(this.node).width() / tempWidth);
			var tempRows = Math.ceil(this.items.length / columns);
			var newSize = Math.min( $(this.node).width() / tempColumns , $(this.node).height() / tempRows );
			var tempSide = (newSize == $(this.node).width() / tempColumns) ? size.w : size.h;
			newScale = (tempRows==1) ? tempScale : newSize * newScale / tempSide;;
		}
		hasNewScale = true;
	}
	return (hasNewScale) ? newScale : this.getNewScale(newScale * 0.99);
}

ListGallery.prototype.getNewSize = function(newScale) {
	return { w : this.itemWidth * newScale , h : this.itemHeight * newScale };
}

ListGallery.prototype.getNewSurface = function(newSize) {
	return ( newSize.w * newSize.h ) * this.items.length;
}

ListGallery.prototype.getAvailableSpace = function() {
	var availableSpace = $(this.node).width() * $(this.node).height();
	return availableSpace;
}



},{}],6:[function(require,module,exports){
// package ui
var Slider = require('./slider/src/Slider.js');
var SliderWithThumbnails = require('./slider/src/SliderWithThumbnails.js');
var ItemSlider = require('./slider/src/ItemSlider.js');
var Preloader = require('./preloader/src/Preloader.js');
var ItemList = require('./list-gallery/src/ItemList.js');
var ItemPicture = require('./list-gallery/src/ItemPicture.js');
var ItemShortDescription = require('./list-gallery/src/ItemShortDescription.js');
var ItemLargeDescription = require('./list-gallery/src/ItemLargeDescription.js');
var ListGallery = require('./list-gallery/src/ListGallery.js');
var Toggle = require('./toggle/src/Toggle.js');
},{"./list-gallery/src/ItemLargeDescription.js":1,"./list-gallery/src/ItemList.js":2,"./list-gallery/src/ItemPicture.js":3,"./list-gallery/src/ItemShortDescription.js":4,"./list-gallery/src/ListGallery.js":5,"./preloader/src/Preloader.js":7,"./slider/src/ItemSlider.js":8,"./slider/src/Slider.js":9,"./slider/src/SliderWithThumbnails.js":10,"./toggle/src/Toggle.js":11}],7:[function(require,module,exports){
function Preloader(config) {
	this.config = config;
	this.container = this.config.container;
	this.pathSnippet = (this.config.pathSnippet) ? this.config.pathSnippet : "code/monkeyman/ui/preloader/snippets/preloader.html";
	this.dataSnippet = [];
	this.autoHeight = (this.config.autoHeight) ? this.config.autoHeight : true;
}

Preloader.prototype.constructor = Preloader;

Preloader.prototype.initialize = function() {
	var snippet = new Snippet( { path : this.pathSnippet , data : this.dataSnippet } );
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	if(this.autoHeight)
		$(this.node).css( { height : $(document).height() } );
}

Preloader.prototype.destroy = function() {
	$(this.node).remove();
}
},{}],8:[function(require,module,exports){
function ItemSlider(config) {
	this.config = config;
	this.container = this.config.container;
	this.pathSnippet = this.config.snippet;
	this.data = this.config.data;
	this.dataSnippet = [ this.data.thumb ];
}

ItemSlider.prototype.constructor = ItemSlider;

ItemSlider.prototype.initialize = function() {
	var snippet = new Snippet( { path : this.pathSnippet, data : this.dataSnippet });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
}
},{}],9:[function(require,module,exports){
function Slider(config) {
	this.config = config;
	this.container = this.config.container;
	this.current = 0;
	this.pathSnippet = (this.config.snippet) ? this.config.snippet : "";
	this.pathItemSnippetSlider = (this.config.itemSnippet) ? this.config.itemSnippet : "";
	this.pictures = (this.config.pictures) ? this.config.pictures : [];
	this.dataSnippet = [];
}

Slider.prototype.constructor = Slider;

Slider.prototype.initialize = function() {
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" :this.dataSnippet });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	this.addPictures();

	$(this.node).width(this.config.width);	
	this.setConfig();
	this.configListeners();
}

Slider.prototype.addPictures = function() {
	if(this.pictures.length > 0) {
		this.pictures.forEach(function(item){
			var itemSlider = new ItemSlider( { container:$(this.node).find(".content-slider-list"),snippet:this.pathItemSnippetSlider,data:item,path:this.path } );
			itemSlider.initialize();
		},this);

		if($(this.node).find(".content-slider-list li").length <= 1){
			$(this.node).find(".controls-slider").css({ display : "none" });
		}
	}
}

Slider.prototype.setConfig = function() {
	this.delay = (this.config.delay) ? this.config.delay * 1000 : 3000; 
	this.hasTimer = (this.config.delay == 0) ? false : true;

	$(this.node).height(this.config.height);
	$(this.node).find(".content-slider-list").height(this.config.height);
	$(this.node).find(".controls-slider").width(this.config.width);
	this.max = $(this.node).find(".content-slider-list li").length;
	$(this.node).find(".content-slider-list").width(this.config.width * this.max);	
	if(this.hasTimer)
		this.startTimer();
}

Slider.prototype.startTimer = function() {
    this.timer = setTimeout(this.onTickTimer,this.delay,{context:this});
}

Slider.prototype.onTickTimer = function(data) {
	data.context.goNext();
	data.context.timer = setTimeout(data.context.onTickTimer,data.context.delay,{context:data.context});
}

Slider.prototype.configListeners = function() {
	$(this.node).find(".btn.prev").click( { context : this }, this.onClickPrev );
	$(this.node).find(".btn.next").click( { context : this }, this.onClickNext );
}

Slider.prototype.onClickPrev = function(event) {
	event.data.context.goPrevious();
	if(event.data.context.hasTimer){
		clearTimeout(event.data.context.timer);
		event.data.context.timer = setTimeout(event.data.context.onTickTimer,10000,{context:event.data.context});
	}
}

Slider.prototype.goPrevious = function() {
	if(this.current < 0) {
		this.current++;
		this.animate();
	} else {
		this.current = -this.max + 1;
		this.animate();
	}
}

Slider.prototype.onClickNext = function(event) {
	event.data.context.goNext();
	if(event.data.context.hasTimer){
		clearTimeout(event.data.context.timer);
		event.data.context.timer = setTimeout(event.data.context.onTickTimer,10000,{context:event.data.context});
	}
}

Slider.prototype.goNext = function() {
	if(Math.abs((this.current - 1)) < this.max) {
		this.current--;
		this.animate();
	} else {
		this.current=0;
		this.animate();
	}
}

Slider.prototype.getThumbPosition = function(){
	var pos = this.current * this.config.width;
	return pos;
}

Slider.prototype.animate = function() {
	$(this.node).find(".content-slider-list").animate({ left:this.getThumbPosition() },300,function(){ /*Animation Complete*/ });
}
},{}],10:[function(require,module,exports){
function SliderWithThumbnails(config) {
	Slider.call(this,config);
	this.marginThumbnails = (config.marginThumbnails) ? config.marginThumbnails : 0;
}

SliderWithThumbnails.prototype.constructor = SliderWithThumbnails;

inheritPrototype(SliderWithThumbnails,Slider);

SliderWithThumbnails.prototype.init = function() {
	Slider.prototype.init.call(this);
}

SliderWithThumbnails.prototype.setConfig = function() {
	this.hasTimer = false;
	$(this.node).find(".controls-slider").width(this.config.width);
	this.max = $(this.node).find(".content-thumbnails-list li").length;
	$(this.node).find(".content-thumbnails-list").width( (this.config.widthThumbnail * this.max) + (this.max * (this.marginThumbnails*2) ) + 12 );
	$(this.node).find(".content-slider-list").width(this.config.width * this.max);

	$($(this.node).find(".content-thumbnails-list li")[this.current]).addClass("selected");
}

SliderWithThumbnails.prototype.configListeners = function() {
	Slider.prototype.configListeners.call(this);
	$(this.node).find(".content-slider-list li").click( { context:this }, this.onClickThumb );
	$(this.node).find(".content-thumbnails-list li").click( { context:this }, this.onClickThumbnail );
}

SliderWithThumbnails.prototype.animate = function() {
	Slider.prototype.animate.call(this);
	$(this.node).find(".content-thumbnails-list").animate({ left:this.getThumbnailPosition() },300,function(){ /*Animation Complete*/ });
	$(this.node).find(".content-thumbnails-list li").removeClass("selected");
	$($(this.node).find(".content-thumbnails-list li")[ Math.abs(this.current) ]).addClass("selected");
}

SliderWithThumbnails.prototype.getThumbnailPosition = function(){
	var pos = (this.current * this.config.widthThumbnail) + this.marginThumbnails;
	return pos;
}

SliderWithThumbnails.prototype.onClickThumb = function(event) {
	if(event.data.context.config.parent){
		event.data.context.config.parent.showThumb( { path:$(this).data("path"), image:$(this).data("image") } );
	}
}

SliderWithThumbnails.prototype.onClickThumbnail = function(event) {
	event.data.context.current = ($(this).index() > event.data.context.current ) ? -($(this).index()) : Math.abs($(this).index());
	event.data.context.animate();
}
},{}],11:[function(require,module,exports){
function Toggle(config){
	this.config = config;
	this.container = this.config.container;
	this.pathSnippet = (this.config.pathSnippet) ? this.config.pathSnippet : "code/Monkeyman/ui/toggle/snippets/toggle.html";
	this.state = (this.config.state) ? this.config.state : false;
	this.padding = 5;
}

Toggle.prototype.constructor = Toggle;

Toggle.prototype.initialize = function() {
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [] });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
	//this.showState();
	$(this.node).click( { context:this }, this.onChangeState );
	//$(this.node).find(".toggle-btn").click( { context:this }, this.onChangeState );
	//$(this.node).find(".toggle-btn").css({ left : this.padding })
}

Toggle.prototype.onChangeState = function(e) {
	var self = e.data.context;
	self.state = (self.state) ? false : true;
	self.onSwitch();	
}

Toggle.prototype.onSwitch = function() {
	var self = this;
	$(this.node).find(".toggle-btn").animate( { left : (this.state) ? $(this.node).width() - $(this.node).find(".toggle-btn").width() - this.padding : this.padding } ,200, function(){
		//debugger;
		//self.showState();
	} );
}

Toggle.prototype.showState = function() {
	var addClassName = (this.state) ? "active" : "inactive";
	var removeClassName = (this.state) ? "inactive" : "active";

	$(this.node).removeClass(removeClassName);
	$(this.node).addClass(addClassName);
}
},{}]},{},[6]);
