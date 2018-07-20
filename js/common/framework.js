var framework = (function(){
	return {
		"views" : {},
		"modal" : null,
		loadFile : function(type, fileDetails, callback){
			var fileElement;
			switch(type){
				case 'js' : {
					fileElement = document.createElement("script");
					fileElement.setAttribute("type",  "application/javascript");
					fileElement.setAttribute("src", fileDetails.path);
					break;
				}
				case 'css' : {
					fileElement=document.createElement("link")
					fileElement.setAttribute("rel", "stylesheet")
					fileElement.setAttribute("type", "text/css")
					fileElement.setAttribute("href", fileDetails.path)
					break;
				}
			}

			if(fileElement){
				fileElement.addEventListener('load', function(event) {
	                if (typeof callback === 'function') {
	                    callback();
	                }
				});
				document.getElementsByTagName("head")[0].appendChild(fileElement);
			}
		},
		loadJS : function(path, callback){
			path = globalConfig.isLocal ? '.' + path : path;
    		var jsElm = {path : path};
    		this.loadFile('js', jsElm, callback);
		},
		loadCSS : function(path, callback){
			path = globalConfig.isLocal ? '.' + path : path;
			var cssElm = {path : path};
			this.loadFile('css', cssElm, callback);
		},
		doAjax : function(requestObj, callback){
			if(globalConfig.isLocal)
			{
        		this.loadJS(serviceLocalMap[requestObj.url] , function(){
        			if (typeof callback === 'function') {
	                    callback(response);
	                }
        		});
			}
			else
			{
				var xobj = new XMLHttpRequest();
        		xobj.overrideMimeType("application/json");
    			xobj.open(requestObj); 
			    xobj.onreadystatechange = function () {
			          if (xobj.readyState == 4 && xobj.status == "200") {
			          	if(callback){
			            	callback(xobj.responseText);
			          	}
			          }
			    };
			    xobj.send(requestObj);
			}
		},
		getElement : function(dom, selector){

			if(selector.indexOf("#") == 0)
			{
				var selectorStr = selector.substring(1,selector.length);
				return document.getElementById(selectorStr) ? [document.getElementById(selectorStr)] : [];
			}
			else if(selector.indexOf(".") == 0)
			{
				var selectorStr = selector.substring(1,selector.length);
				return dom.getElementsByClassName(selectorStr);
			}
			else 
			{
				return dom.getElementsByTagName(selector);
			}
		},
		createView : function(selector, viewObj, model, options, domView){

			var that = this;
			var themeContainer = domView ? this.getElement(domView.$element,selector)[0] : this.getElement(document,selector)[0];

			
			if(options && !options.replace)
			{
				var tmpDiv = document.createElement('div');
				tmpDiv.innerHTML = viewObj.template;
				var child = tmpDiv.children[0];
				themeContainer.appendChild(child);
				viewObj.$element = child;
			}
			else
			{
				themeContainer.innerHTML = viewObj.template;
				viewObj.$element = themeContainer.children[0];
			}
			
			
			viewObj.model = model;

			viewObj.replaceChildView = function(childViewSelector, childViewName, childViewModel)
			{
				that.loadView(childViewSelector, childViewName, childViewModel, {"replace" : true}, viewObj);
			}

			viewObj.appendChildView = function(childViewSelector, childViewName, childViewModel)
			{
				that.loadView(childViewSelector, childViewName, childViewModel, {"replace" : false}, viewObj);
			}

			viewObj.render();

			

			//bind Events

			if(viewObj.events)
			{
				viewObj.events.forEach(function(event){
					var eventElements = that.getElement(viewObj.$element, event.selector)
					for(var i=0; i<eventElements.length; i++){
						eventElements[i].addEventListener(event.listenTo, viewObj[event.listener].bind(viewObj));
					}
				});
			}

			return viewObj;
		},
		loadView : function(selector, viewName, model, options, domView){
			var that = this;
			if(that.views[viewName])
			{
				that.createView(selector, that.views[viewName], model, options, domView);
			}
			else
			{
				var path = viewMap[viewName];
				if(path){
					that.loadJS(path , function(){
						that.createView(selector, that.views[viewName], model, options, domView);
		    			if (typeof callback === 'function') {
		                    callback();
		                }
		    		});
				}
				
			}	
		},
		createModal : function(){
			var that  = this;
			if(!this.modal)
			{

				this.modal = this.createView('body', {
											template :  "<div class='modal-main'>"+
															"<div class='modal-header'><div class='modal-close'>[X]</div></div>"+
															"<div class='modal-content'></div>" +
														"</div>",
											events : 
											[
												{
													"selector" : ".modal-close",
													"listenTo" : "click",
													"listener" : "removeModal"
												}
											],
											"removeModal" : function(){
												that.modal.$element.hidden = true;
											},
											render : function(){}
										}, null, {replace:false});
			}
		},
		openModalView : function(viewName, viewModel, onClose, onDiscard){
			this.createModal();
			this.modal.onClose = onClose;
			this.modal.onDiscard = onDiscard;
			this.loadView('.modal-content', viewName, viewModel, {replace: true}, this.modal);
			this.modal.$element.hidden = false;
		},
		closeModal : function(data){
			debugger;
			this.modal.$element.hidden = true;
			if(this.modal.onClose){
				this.modal.onClose(data);
			}
			this.modal = null;
		},
		discardModal : function(){
			this.modal.$element.hidden = true;
			
			if(this.modal.onDiscard){
				this.modal.onDiscard();
			}

			this.modal = null;
		},
		registerView : function(viewName, viewObj)
		{
			this.views[viewName] = viewObj;
		}
	}
})();