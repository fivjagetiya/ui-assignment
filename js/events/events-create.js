(function(){
	framework.registerView("events.create", {
		"template" :"<div class='create-event'>"+
						"<div class='event-form-container'>"+
							"<div class='row'>"+
								"<div class='field-group col-md-12'><div class='field-label col-md-6'>Name</div><div class='field'><input type='text' class='event-name-val'/></div></div>"+
							"</div>"+
							"<div class='row'>"+
								"<div class='field-group col-md-6'><div class='field-label col-md-6'>Category</div><div class='field'><select class='event-category-val'></select></div></div>"+
								"<div class='field-group col-md-6'><div class='field-label col-md-6'>Date</div><div class='field'><input type='text' class='event-date-val'/></div></div>"+
							"</div>"+
							"<div class='row'>" + 
								"<div class='field-group col-md-6'><div class='field-label col-md-6'>Country</div><div class='field'><input type='text' class='event-country-val'/></div></div>"+
								"<div class='field-group col-md-6'><div class='field-label col-md-6'>City</div><div class='field'><input type='text' class='event-city-val'/></div></div>"+
							"</div>"+
							
							"<div class='row'>"+
								"<div class='field-group col-md-6'><div class='field-label col-md-6'>Address</div><div class='field'><input type='text' class='event-address-val'/></div></div>"+
								"<div class='field-group col-md-6'><div class='field-label col-md-6'>isPrivate</div><div class='field'><input type='text' class='event-private-val'/></div></div>"+
							"</div>"+
							"<div class='row'><div class='col-md-12 save-event-btn'><button class='create-edit-btn'>Save</button></div></div>"+
						"</div>"+
					"</div>",
		"events" : [
			{
				"selector" : ".save-event-btn",
				"listenTo" : "click",
				"listener" : "save"
			}
		],
		"save" : function(event)
		{
			debugger;
			if(!this.model){
				this.model = {};
			}

			this.model.name = this.$element.getElementsByClassName('event-name-val')[0].value;
			this.model.date = this.$element.getElementsByClassName('event-date-val')[0].value;
			this.model.city = this.$element.getElementsByClassName('event-city-val')[0].value;
			this.model.country = this.$element.getElementsByClassName('event-country-val')[0].value;
			this.model.address = this.$element.getElementsByClassName('event-address-val')[0].value;
			this.model.isPrivate = this.$element.getElementsByClassName('event-private-val')[0].value;

			var eventCategory  = this.$element.getElementsByClassName('event-category-val')[0];

			this.model.category = eventCategory.selectedIndex != -1 ?  eventCategory.options[eventCategory.selectedIndex].value : null;
			
			var that = this;

			EventsService.saveEvent(this.model, function(){
				framework.closeModal(that.model);	
			});
			
		},
		"render" : function(){
			if(this.model){

				this.$element.getElementsByClassName('event-name-val')[0].value = this.model.name;
				this.$element.getElementsByClassName('event-date-val')[0].value = this.model.date;
				this.$element.getElementsByClassName('event-city-val')[0].value = this.model.city;
				this.$element.getElementsByClassName('event-country-val')[0].value = this.model.country;
				this.$element.getElementsByClassName('event-address-val')[0].value = this.model.address;
				this.$element.getElementsByClassName('event-private-val')[0].value = this.model.isPrivate;

				var select = this.$element.getElementsByClassName("event-category-val")[0];
				var option;
				for (var i=0, len=EventsService.categories.length; i<len; i++) {
		            var option = document.createElement('option');
		            option.appendChild( document.createTextNode(EventsService.categories[i]));
		            option.value = EventsService.categories[i];
		            option.selected = EventsService.categories[i] == this.model.category;
		            select.appendChild(option);
		        }
			}

			 this.$element.getElementsByClassName('event-category-val')[0]
		}
	});
})();