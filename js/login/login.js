var LoginService = (function(){
	return {
		"loggedInDetails" : null,
		"doLogin" : function(username, password, callback)
		{
			var that = this;
			framework.doAjax(
				{
					url: "login", 
					data : {
						"username" : username,
						"password" : password
					}
				}, 
				function(response){
					that.loggedInDetails = response.data;
					if(globalConfig.enableTheme)
					{
						ThemeService.applyTheme(response.data.theme);
					}

					if (typeof callback === 'function') {
	                    callback(response);
	                }

				}
			);
		},
		"doLogout" : function()
		{
			this.loggedInDetails = null;
		},
		"saveDefaultSetting" : function(groupBy){
			this.loggedInDetails.eventGroupBy = groupBy;
			var body = document.getElementsByTagName("body")[0];
			this.loggedInDetails.theme = body.getAttribute("theme");
			//TODO: call save to backend here
		}
	}
})();