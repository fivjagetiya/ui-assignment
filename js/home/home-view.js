(function(){
	framework.registerView("home.baseview", {
		"template" :"<div class='home'>"+
						"<div class='logged-in-header'></div>" +
						"<div class='events-container'></div>"+
					"</div>",
		"events" : [
			
		],
		"render" : function(){
			this.replaceChildView('.events-container', 'events.list');
		}
	});
})();