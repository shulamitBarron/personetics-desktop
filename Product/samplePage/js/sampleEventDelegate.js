var SampleEventDelegate = function(){

	this.sessionEnded = function(config){
		$('#personetics-insights-container').show();
		$('#personetics-story-container').hide();
		myApp.startPersonetics();
	};

	this.registered = function() {

	};

	this.sessionStarted = function(){

	};
	this.navigateToPage = function(params){
		alert("navigateToPage params:" + JSON.stringify(params));
	};
	this.sessionError = function(error){
		
	};

	this.widgetEvent = function widgetEvent(widget, params) {

		var eventType = params.eventType;
		switch (eventType) {
			case "teaserClick":
                params.filter = true;
				samplePage.master.openModule("inbox",params);
				break;
		}
	};

    /**
     * Send data to native interface
     * @param requestId
     * @param postData
     */
    this.sendRequestToPServer = function(requestHeader, postData, requestId){
        Personetics.utils.PLogger.debug("Personetics Events Delegate requestDataFromNative: " + JSON.stringify(postData) + ", requestId: " + requestId);

        var requestString = postData.hasOwnProperty("requestString") ? data.requestString : "sendRequestToPServer";

        myApp.sendRequestToPServer(
            requestHeader,
        	postData,
			function(response) {
                personetics.handlePServerResponse(response, requestId);
            }
		);

    };
};