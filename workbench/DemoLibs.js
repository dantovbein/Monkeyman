function Libs(_lib_,onSuccess) {
	var self = this;
	this.lib = _lib_;
	this.onSuccess = onSuccess;
	
	if(window.jQuery == undefined) {
		console.log("Jquery is not loaded. It's mandatory to load JQuery");
	}else{
		this.loadFiles(this.getFiles(this.lib));
	}
};

Libs.prototype.constructor = Libs;

Libs.prototype.getFiles = function(_lib_) {
	var self = this;
	this.libraries = new Array(
		{
			"name"	: "",
			"libs"	: [ ]
		}
	);
	var _libs_ = new Array();
	this.libraries.forEach(function(d){
		if(d.name == _lib_)
			_libs_ = d.libs;
	});
	return _libs_;
};

Libs.prototype.loadFiles = function(files) {
	var index,extension,file;
	this.filesLoaded = 0;
	files.forEach(function(f){
		index = f.lastIndexOf(".",f.length);
		extension = f.slice(index + 1,f.length);
		switch(extension)
		{
			case "css":
				$.ajax({
					context : this,
					async : false,
					url : f,
					success : function(result) {
						this.filesLoaded++;
						$("<style></style>").appendTo("head").html(result);
					},
					error : function(error) {
						console.log("No se pudo cargar " + f);
					}
				});
			break;
			case "js":
				$.ajax({
					context : this,
					async : false,
					url : f,
					dataType : "script",
					success : function(result) {
						this.filesLoaded++;
						console.log("Se cargo: " + f);
					},
					error : function(error) {
						console.log("No se pudo cargar " + f);
					}
				});

			break;
		}
	},this);
	
	if(this.filesLoaded==files.length){
		console.log("Se cargaron todos los archivos!");
		this.onSuccess();
	}else{
		alert("Hay archivos que no se cargaron")
	}
};