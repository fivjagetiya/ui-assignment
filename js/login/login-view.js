(function(){
	framework.registerView("login.baseview", {
		"template" :"<div class='login-form'>"+
						"<div class='login-message'></div>"+
						"<div class='row'>"+
							"<div class='field-group col-md-12'><div class='field-label col-md-6'>Username</div><div class='field'><input type='text' class='login-username' id='username'/></div></div>"+
						"</div>"+
						"<div class='row'>"+
							"<div class='field-group col-md-12'><div class='field-label col-md-6'>Password</div><div class='field'><input type='password'  class='login-password' id='password'/></div></div>"+
						"</div>"+
						"<div class='row'><div class='col-md-12'><button class='do-login-btn'>Login</button></div></div>"+
					"</div>",
		"events" : [
			{
				"selector" : ".do-login-btn",
				"listenTo" : "click",
				"listener" : "login"
			}
		],
		"login" : function(event)
		{
			var username = this.$element.getElementsByClassName('login-username')[0].value;
			var password = this.$element.getElementsByClassName('login-password')[0].value;

			if(username && password)
			{
				LoginService.doLogin(username, password, function(response){
					framework.loadView("#main-container","home.baseview");
				});
			}
			else
			{
				var message = this.$element.getElementsByClassName('login-message')[0];
				message.innerHTML= "Username or Password is blank";
			}
			
		},
		"render" : function(){
			
		}
	});
})();