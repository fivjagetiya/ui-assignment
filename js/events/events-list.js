(function(){
	framework.registerView("events.list", {
		"template" :"<div class='event-list-page'>"+
						"<div class='row'>"+
							"<div class='field-group col-md-6'>"+
								"<div class='field-label col-md-3'>Group By</div>"+
								"<div class='field col-md-5'>"+
									"<select class='group-by'>"+
										"<option value='' selected>Select Option Here</option>"+
										"<option value='category'>Category</option>"+
										"<option value='country'>Country</option>"+
									"</select>"+
								"</div>"+
								"<div class='field col-md-4'>"+
									"<button class='save-as-default'>Save As Default</button>"+
								"</div>"+
							"</div>"+
							"<div class='field-group col-md-6'>"+
								"<button class='create-event-btn'>Create New Event</button>"+
							"</div>"+
						"</div>"+
						"<div class='events-list'></div>"+
					"</div>",
		"events" : [
			{
				"selector" : ".create-event-btn",
				"listenTo" : "click",
				"listener" : "loadCreateEvent"
			},
			{
				"selector" : ".group-by",
				"listenTo" : "change",
				"listener" : "groupEvents"
			},
			{
				"selector" : ".save-as-default",
				"listenTo" : "click",
				"listener" : "saveDefaultSetting"
			}
		],
		"saveDefaultSetting": function(){
			LoginService.saveDefaultSetting(EventsService.currentGroupBy);
		},
		"commonRenderEvents" : function(events){
			var that = this;

			if(Array.isArray(events))
			{
				events.forEach(function(event){
					that.appendChildView('.events-list', 'events.view', event);
				});
			}
			else
			{
				for (var key in events) {
				   if (events.hasOwnProperty(key)) {
				      	that.$element.getElementsByClassName('events-list')[0].innerHTML += ('<div class="group-header">' + key + '<div>');
				      	events[key].forEach(function(event){
							that.appendChildView('.events-list', 'events.view', event);
						});
				   }
				}
				
			}
		},
		"groupEvents" : function(evt){
			var that = this;
			that.$element.getElementsByClassName('events-list')[0].innerHTML = '';
			var groupBy = evt.currentTarget.options[evt.currentTarget.selectedIndex].value;
			var events = EventsService.getGroupedEvent(groupBy);
			that.commonRenderEvents(events);
		},
		"loadCreateEvent" : function(event)
		{
			var that = this;
			framework.openModalView('events.create', null, function(){
				var events = EventsService.getGroupedEvent(EventsService.currentGroupBy);
				that.$element.getElementsByClassName('events-list')[0].innerHTML = '';
				that.commonRenderEvents(events);
			});
		},
		"renderMyEvents" : function(){
			var that = this;
			EventsService.getMyEvents(function(response){
				var events = response.data;
				that.commonRenderEvents(events);
			});
		},
		"render" : function(){
			this.renderMyEvents();
		}
	});
})();