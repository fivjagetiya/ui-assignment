(function(){
	framework.registerView("events.view", {
		"template" :"<div class='events-view-container'>"+
						"<div class='row'>"+
							"<div class='event-name'></div><div class='event-date'></div>"+
						"</div>"+
						"<div class='row event-details'>" + 
							"<div class='event-city'></div>"+
							"<div class='event-country'></div>"+
						"</div>"+
						"<div class='row'>"+
							"<div class='event-category'></div>"+
						"</div>"+
						"<div class='row edit-event'>"+
							"<button class='create-edit-btn'>Edit Event</button>"+
						"</div>"+
					"</div>",
		"events" : [
			{
				"selector" : ".create-edit-btn",
				"listenTo" : "click",
				"listener" : "loadCreateEvent"
			}
		],
		"loadCreateEvent" : function(event)
		{
			var that = this;
			framework.openModalView('events.create', this.model, function(updatedModel){
				that.model = updatedModel;
				that.render();
			});
		},
		"render" : function(){
			this.$element.getElementsByClassName('event-name')[0].innerHTML =  this.model.name;
			this.$element.getElementsByClassName('event-date')[0].innerHTML =  this.model.date || '';
			this.$element.getElementsByClassName('event-city')[0].innerHTML =  this.model.city || '';
			this.$element.getElementsByClassName('event-category')[0].innerHTML =  this.model.categor|| '';
		}
	});
})();