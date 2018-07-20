(function(){
	if(globalConfig.enableTheme)
	{
		framework.loadView("#theme-container", "theme.baseview");
	}

	document.onreadystatechange = function () {
	    if (document.readyState == "interactive") {
	       	if(LoginService.loggedInDetails)
			{
				framework.loadView("#main-container", "home.baseview");				
			}
			else
			{
				framework.loadView("#main-container","login.baseview");
			}
	    }
	}
})();