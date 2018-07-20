var EventsService = (function(){
	return {
		"publicEvents" : [],
		"myEvents" : [],
		"categories" : [],
		"currentGroupBy" : '',
		"loadCategories" : function(){
			var that = this;
			framework.doAjax(
				{
					url: "getSystemCategories"
				}, 
				function(response){
					that.categories = response.data;
				}
			);
		},
		"getMyEvents" : function(callback)
		{
			var that = this;
			framework.doAjax(
				{
					url: "getMyEvents", 
					data : {
						"username" : LoginService.loggedInDetails.username
					}
				}, 
				function(response){
					that.myEvents = response.data;
					response.data = that.getGroupedEvent(LoginService.loggedInDetails.eventGroupBy);
					if (typeof callback === 'function') {
	                    callback(response);
	                }
				}
			);
		},
		getGroupedEvent : function(groupBy){
			this.currentGroupBy = groupBy;
			if(groupBy)
			{
				var data = {};
				this.myEvents.forEach(function(event){
					if(!data[event[groupBy]])
					{
						data[event[groupBy]] = []
					}
					data[event[groupBy]].push(event);
				});

				return data;
			}
			else
			{
				return this.myEvents;
			}
		},
		"getPublicEvents" : function(callback)
		{
			var that = this;
			framework.doAjax(
				{
					url: "getPublicEvents", 
					data : {
						"username" : LoginService.loggedInDetails.username
					}
				}, 
				function(response){
					that.publicEvents = response.data;
					if (typeof callback === 'function') {
	                    callback(response);
	                }
				}
			);
		},
		"saveEvent" : function(event, callback)
		{
			var that = this;
			
			if(!event.id){
				event.createdBy = LoginService.loggedInDetails.username;
			}
			framework.doAjax(
				{
					url: "saveEvent", 
					data : event
				}, 
				function(response){
					if(!event.id)
					{
						event.id = Math.random();
						//TODO : response.data.id;
						if(!event.private)
						{
							that.publicEvents.push(event);
						}

						that.myEvents.push(event);
					}
					else
					{
						for(var ind=0; ind< that.myEvents.length; ind++){
							if(that.myEvents[ind].id == event.id){
								that.myEvents[ind] = event;
								break;
							}
						}
					}
					if (typeof callback === 'function') {
	                    callback(response);
	                }
				}
			);
		}
	}
})();

EventsService.loadCategories();