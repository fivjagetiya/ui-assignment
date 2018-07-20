var ThemeService = (function()
{
	framework.registerView("theme.baseview", {
		"template" :"<div class='theme-bar'>" +
						"<div> Change Theme </div>" +
						"<div>" +
							"<select class='theme-select'></select>" +
						"</div>" +
					"</div>",
		"getThemes" : function(){
			var that = this;
			framework.doAjax({
				url : "getTheme"
			}, function(){
				that.setThemes(response);
			});
		},
		"events" : [
			{
				"selector" : ".theme-select",
				"listenTo" : "change",
				"listener" : "changeTheme"
			}
		],
		"setThemes" : function(response){
			var select = this.$element.getElementsByTagName("select")[0];
			var option;
			for (var i=0, len=response.data.length; i<len; i++) {
	            var option = document.createElement('option');
	            option.appendChild( document.createTextNode( response.data[i].text ) );
	            option.value = response.data[i].value;
	            if(response.data[i].isSelected)
	            {
	            	option.selected = true;
	            }
	            
	            select.appendChild(option);
	        }
		},
		"changeTheme" : function(event){
			ThemeService.applyTheme(event.currentTarget.options[event.currentTarget.selectedIndex].value);
		},		
		"render" : function(){
			this.getThemes();
		}
	});

	return {
		"applyTheme" : function(themeId){
			var body = document.getElementsByTagName("body")[0];
			body.setAttribute("theme", themeId);
		}
	}
})();