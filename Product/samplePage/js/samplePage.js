(function (window, $, Personetics, samplePage){
    var Handlebars = Personetics.UI.Handlebars;
    window.app = function app(){

        this.appContext = {
            deviceType: "web",
            ctxId: "dashboard",
            headers:{
                "authToken": this.userId,//** */
                "Content-Type": "application/json; charset=UTF-8"
            },
            protocolVersion: Personetics.projectConfiguration.getConfig("protocolVersion")
        };

        this.startPersonetics = function startPersonetics(){
            //show only the insights
            this.el.siblings().not("#personetics-side-bar").hide();
            $("#personetics-side-bar").attr("class","dashboard_selected");
            this.el.show();
            this.el.find('#personetics-insights').empty();
            this.el.find('#personetics-story-container').empty();
            var numOfInsightsEl = $("#personetics-side-bar .numOfInsights");
            numOfInsightsEl.addClass("hide");
            /**set the parameters */
            samplePage.master.config.userId = $('#userId').val();

            /**get the properties from the login and advanced */
            this.appContext.pserverUrl = samplePage.master.config.url;
            this.appContext.userId = samplePage.master.config.userId;
            this.appContext.lang = samplePage.master.config.lang;
            this.appContext.mode = samplePage.master.config.mode;
            //** */
            /**/
            this.isMovedToInbox = false;
            var me = this;
            //start the personetics flow
            this.showLoading();
            this.callInitPersonetics(function(){
                me.callGetNumOfInsights(function(getNumOfInsightsResponse){
                    if(getNumOfInsightsResponse && getNumOfInsightsResponse.ok == true) {
                        if (typeof getNumOfInsightsResponse.numberOfInsights !== "undefined" && getNumOfInsightsResponse.numberOfInsights > 0) {
                            numOfInsightsEl.text(getNumOfInsightsResponse.numberOfInsights);
                            numOfInsightsEl.removeClass("hide");
                        }
                    }
                me.callGetInsights(function(getInsightsResponse){
                    if(getInsightsResponse && getInsightsResponse.ok == true){
                        if(me.appContext.mode == "singleTeaser")
                            me.startSingleTeaser(getInsightsResponse);
                        else
                            me.startTeaserCarousel(getInsightsResponse);
                    }
                    else{
                        if(getInsightsResponse && getInsightsResponse.insights && getInsightsResponse.insights.length === 0){
                            var personeticsInsightsEl = me.el.find("#personetics-insights");
                            personeticsInsightsEl.empty();
                            var params = {
                                textSmall: Personetics.dictionary.getText("There are no insights for you right now"),
                                imgClass: "errorImage"
                            };
                            var html = Personetics.utils.messages.noInsightsMessage(params);
                            personeticsInsightsEl.append(html);
                        }else{
                            me.onError(getInsightsResponse)
                        }
                    }
                });
                });
            });
        };

        this.callInitPersonetics = function callInitPersonetics(callback){
            personetics.initialize({
                eventsDelegate: new SampleEventDelegate(),
                pserverUrl: this.appContext.pserverUrl,
                userId: this.appContext.userId,
                lang: this.appContext.lang,
                ctxId: this.appContext.ctxId,
                base64EncodeResponse: false, //TODO: should be implicit, and default should be false
                // debugMode: true
            }, callback, callback); //TODO: merge callbacks
        };

        this.callGetNumOfInsights = function callGetNumOfInsights(callback){
            var requestConfig = {
                type: "getNumberOfInsights",
                autoGenerate: true
            }
            if(typeof testData != 'undefined'){
                callback(testData.insights);
            }
            else{
                this.sendRequestToPServer(this.appContext.headers, requestConfig, callback,"sampleNew");
            }
        };

        this.callGetInsights = function callGetInsights(callback){
            var requestConfig = {
                type: "getInsights",
                autoGenerate: true
            }
            if(typeof testData != 'undefined'){
                callback(testData.insights);
            }
            else{
                this.sendRequestToPServer(this.appContext.headers, requestConfig, callback,"sampleTopRelevant");
            }
        };
        this.sendRequestToPServer = function sendRequestToPServer(requestHeader,requestConfig, callback, ctxId){
            // default request body
            var me = this;
            var requestBody = {
                protocolVersion: this.appContext.protocolVersion,
                lang: this.appContext.lang,
                ctxId: ctxId ? ctxId : this.appContext.ctxId
            };
            if(requestHeader.hasOwnProperty('authToken') && (typeof requestHeader.authToken !== this.appContext.userId)){
                requestHeader.authToken = this.appContext.userId;
            }
            requestBody = $.extend(requestBody, requestConfig);
            // do the ajax call
            $.ajax({
                url: this.appContext.pserverUrl,
                type: "POST",
                dataType: "json",
                headers: requestHeader,
                data: JSON.stringify(requestBody),
                success: callback,
                error: function(error){
                    callback(error);
                }
            });
        };
        this.onError = function()
        {
            if(typeof this.el === "undefined"){
                return;
            }
            var personeticsInsightsEl = this.el.find("#personetics-insights");
            personeticsInsightsEl.empty();
            var params = {
                textLarge:Personetics.dictionary.getText(""),
                textSmall:Personetics.dictionary.getText("inboxTechnicalIssues"),
                imgClass:"errorImage"
            };
            var html = Personetics.utils.messages.errorMessage(params);
            personeticsInsightsEl.append(html);
        };
        this.startSingleTeaser = function startSingleTeaser(response){
            // default widget config
            this.hideLoading()
            var startWidgetConfig = {
                widgetType: 'teaser-widget-single',
                lang: this.appContext.lang,
                userId: this.appContext.userId,
                pserverUrl: this.appContext.pserverUrl,
                filter: true
            };

            var parentEl = this.el.find('#personetics-insights');

            // iterate over insights, for each one create an element, add to parent element, and start a new widget in the new
            // element
            $.each(response.insights, function(index, insight){
                var teaserItem = $("<div class='teaser-item'></div>");
                parentEl.append(teaserItem);
                startWidgetConfig.el = teaserItem;
                startWidgetConfig.insight = insight;
                personetics.startWidget(startWidgetConfig);
            });
        };

        this.startTeaserCarousel = function startTeaserCarousel(response){
            if(!this.isMovedToInbox) {
                personetics.startWidget({
                    el: this.el.find('#personetics-insights'),
                    widgetType: 'teaser-widget-carousel',
                    lang: this.appContext.lang,
                    payload: response,
                    userId: this.appContext.userId,
                    pserverUrl: this.appContext.pserverUrl,
                    filter: false
                });
            }
        };

        /**append the templates and events */

        this.intialized =  function intialized(){
            //Personetics.UI.Handlebars.registerPartial('sampleSideBar', '{{sampleSideBar}}');
            window.skinSetup = new SkinSetup();
            window.skinSetup.init();

            this.el = $('#personetics-insights-container');
            this.loadSamplePage();
        };

        this.loadSamplePage = function loadSamplePage(){
            var sampleContent = Handlebars.templates['sampleContainer'];
            this.el.append(sampleContent);
            var sampleSideBar = Handlebars.templates['sampleSideBar'];
            $("#personetics-side-bar").append(sampleSideBar);
            this.bindEvents();
        };

        this.logOut = function logOut(){
            samplePage.master.openModule("login");
        };

        this.bindEvents= function bindEvents(){
            var logOutBind = Personetics.bind(this, this.logOut)
            var goToPage = Personetics.bind(this, this.goToPage)
            var loadInboxPage = Personetics.bind(this, this.loadInboxPage)
            this.el.find('#LogOut').bind('click', logOutBind);
            this.el.find('#viewAllTeasers').bind('click', loadInboxPage);
            $('.personetics-side-bar-item').bind('click', goToPage);
        };

        this.loadInboxPage = function() {
            this.isMovedToInbox = true;
            samplePage.master.openModule("inbox");
        };

        this.goToPage = function(event) {
            switch($(event.currentTarget).attr("name"))
            {
                case "dashboard":
                    samplePage.master.openModule("app");
                    break;
                case "insights":
                    samplePage.master.openModule("inbox");
                    break;
            }

        }
        this.showLoading = function showLoading(){
            this.el.find('#personetics-insights').append("<div id='perso-loading-wrapper'><div class='loadingTxt'>" + Personetics.dictionary.getText("insightsLoadInsights") + "</div><div class='perso-loading'></div></div>");
        };

        this.hideLoading = function hideLoading(){
            this.el.find('#personetics-insights').find("#perso-loading-wrapper").remove();
        };
        this.intialized();
    };
})(window, jQuery, window.Personetics = window.Personetics || {}, window.samplePage = window.samplePage || {});

//predefine
(function (window, $, Personetics, samplePage){
    var Handlebars = Personetics.UI.Handlebars;
    var samplePageMaster = function samplePageMaster(){
        this.initialize = function initialize(){
            var config = {};
            config.url = "../../personetics/execute";
            config.lang = "en";
            config.mode = "carousel";
            this.config = config;
        };
        this.initialize();

        this.onReady = function onReady(){
            var initContainer = $('#initPersoneticsContainer');
            var initContainerContent = Handlebars.templates['initContainer'];
            initContainer.append(initContainerContent);
            this.registerPartials();
            this.openModule("login");
            this.bindEvents();
        };
        this.registerPartials = function registerPartials(){
            // init skin setup
            var partialTemplate = Personetics.UI.Handlebars.templates["sampleSideBar"];
            if(typeof partialTemplate !== "undefined" && partialTemplate !== null)
                Personetics.UI.Handlebars.registerPartial("sampleSideBar", partialTemplate);
            var me = this;
            var partialsDictionary = {};
            partialsDictionary["login"] = new samplePage.login();
            partialsDictionary["settings"] = new samplePage.settings();
            setTimeout(function(){
                me.partialsDictionary["app"] = myApp;               
            },500);
            // partialsDictionary["story"] = new samplePage.story();
            partialsDictionary["inbox"] = new samplePage.inbox();
            this.partialsDictionary = partialsDictionary;
        };

        this.openModule = function openModule(moduleName, params){
            if( typeof this.partialsDictionary[moduleName] == 'undefined')  
                return;
            this.partialsDictionary[moduleName].el.show();
            var storyContainerEl = $('#personetics-story-container');
            var insightsContainerEl = $('#personetics-insights-container');
            $("#personetics-side-bar").remove("hideSideBar");
            switch(moduleName){
                case "login":
                    storyContainerEl.hide();
                    insightsContainerEl.hide();
                    $("#personetics-side-bar").addClass("hideSideBar");
                    $('#initPersoneticsContainer').show();
                    $('.settings').show();
                    break;
                case "settings":
                    $("#personetics-side-bar").addClass("hideSideBar");
                    insightsContainerEl.hide();
                    storyContainerEl.hide();
                    $('#initPersoneticsContainer').show();                
                    break;
                case "app":
                    $('#initPersoneticsContainer').hide();
                    storyContainerEl.hide();
                    this.partialsDictionary[moduleName].startPersonetics(insightsContainerEl,insightsContainerEl.find("#personetics-insights"));
                    break;
                case "inbox":
                    insightsContainerEl.hide();
                    $('#personetics-insights').empty();
                    this.partialsDictionary[moduleName].callStartWidget(params);
                    break;
            }
        };

        //TODO improve code
        this.createCircleOverlay = function createCircleOverlay(elem) {
            $(".circle-overlay").remove();
            $circleOverlay = document.createElement('span'), 
            $elemBoundings = elem.getBoundingClientRect();
            //append child as first (prepend);
            $('.sign-in-wrapper')[0].insertBefore(($circleOverlay), $('.sign-in-wrapper')[0].firstElementChild);    
            $circleOverlay.className += 'circle-overlay overlay-' + elem.className;
            var height = $elemBoundings.height? $elemBoundings.height / 2: $('.sign-in-wrapper')[0].offsetHeight;
            var width = $elemBoundings.width? $elemBoundings.width / 2: $('.sign-in-wrapper')[0].offsetWidth;
            $circleOverlay.style.top = ((elem.offsetTop + height) - 750) + 'px';
            $circleOverlay.style.left = ((elem.offsetLeft + width) - 750) + 'px';
        }

        this.bindEvents = function bindEvents(){
            //login and settings events
            $(".row").click(function(){
                $(this).addClass('fill');
            });
            $(".details").blur(function(){
                if($(this).val() == ""){
                    $(this).parent().removeClass('fill');
                }
            });
            $(".delete-input").click(function(e){
                e.preventDefault();
                e.stopPropagation();
                $(this).siblings(".details").val("");
                $(this).parent().removeClass('fill');
            });
        }

    };

    samplePage.master = new samplePageMaster();
    $(document).ready(function(){
        samplePage.master.onReady();
    });
 })(window, jQuery, window.Personetics = window.Personetics || {}, window.samplePage = window.samplePage || {});
(function (window, $, Personetics, samplePage){
    var Handlebars = Personetics.UI.Handlebars;
    samplePage.login = function login(){
        this.intialized =  function intialized(){
            this.el = $('.sign-in');
            this.loadLoginPage();            
            this.parent = samplePage.master;
        };
        
        this.loadLoginPage = function loadLoginPage(){
            var loginContent = Handlebars.templates['loginContainer'];
            this.el.append(loginContent);

            this.bindEvents();
        };
        

        this.bindEvents= function bindEvents(){
            var me = this;

            //TODO improve code
            $(".settings").click(function(){
                $(".sign-in-wrapper").css("background-color", "#5a77bc");
                $("#url").val(me.parent.config.url);
                $(".settings").hide();
                $(".sign-in").hide();
                me.parent.createCircleOverlay(this);
                setTimeout(function(){
                    me.parent.openModule("settings");
                }, 400);
            });
        };

        this.intialized();
    };
})(window, jQuery, window.Personetics = window.Personetics || {}, window.samplePage = window.samplePage || {});
(function (window, $, Personetics, samplePage){
    var Handlebars = Personetics.UI.Handlebars;
    samplePage.settings = function settings(){
        this.intialized =  function intialized(){
            this.el = $('.advanced');
            this.loadSettingsPage();            
            this.parent = samplePage.master;
        };
        
        this.loadSettingsPage = function loadLoginPage(){
            var settingsContent = Handlebars.templates['settingsContainer'];
            this.el.append(settingsContent);

            this.bindEvents();
        };
        

        this.bindEvents= function bindEvents(){
            var me = this;
            $("#advancedInitPersoneticsButton").click(function(){
                var url = $("#url").val();
                if(url.length > 0){
                    me.parent.config.url = url;
                }
                me.parent.config.channel = $("#channel").val();
                var lang = $("#lang").val();
                if(lang.length > 0)
                {
                    me.parent.config.lang = lang;
                }
                me.parent.config.mode = $('#mode').is(':checked') ? "singleTeaser": "";
                $(".sign-in-wrapper").css("background-color", "black");
                me.parent.createCircleOverlay(this);
                me.el.hide();
                setTimeout(function(){
                    me.parent.openModule("login");
                }, 400);
        });
        };

        this.intialized();
    };
})(window, jQuery, window.Personetics = window.Personetics || {}, window.samplePage = window.samplePage || {});
(function (window, $, Personetics, samplePage){
    var Handlebars = Personetics.UI.Handlebars;
    samplePage.story = function story(){
        this.intialized =  function intialized(){
            this.el = $('#personetics-story-container');
            this.loadStoryPage();            
            this.parent = samplePage.master;
        };
        
        this.loadStoryPage = function loadStoryPage(){
            var storyContent = Handlebars.templates['storyContainer'];
            this.el.append(storyContent);

            this.bindEvents();
        };

        this.callStartWidget = function callStartWidget(params){
            var startWidgetConfig = $.extend({}, this.parent.config, true);
            var startWidgetConfig = $.extend(startWidgetConfig, params);
            startWidgetConfig.el = this.el.find('#personetics-story');
            startWidgetConfig.widgetType = "story-widget";
            personetics.startWidget(startWidgetConfig);
        };

        this.bindEvents= function bindEvents(){
            var me = this;
            this.el.find('#story-button-inbox').bind('click', function(){

            });
        };

        this.emptyParent = function()
        {
            this.el.find("#personetics-story").empty();
        };

        this.intialized();
    };
})(window, jQuery, window.Personetics = window.Personetics || {}, window.samplePage = window.samplePage || {});
(function (window, $, Personetics, samplePage){
    var Handlebars = Personetics.UI.Handlebars;
    samplePage.inbox = function inbox(){
        this.intialized =  function intialized(){
            this.el = $('#personetics-story-container');
            this.loadInboxPage();
            this.parent = samplePage.master;
        };

        this.loadInboxPage = function loadInboxPage(){
            this.inboxContainerEl = this.el.find("#personetics-inbox-container");
            this.bindEvents();
        };

        this.callStartWidget = function callStartWidget(params){
            var me = this;
            this.showLoading();
            this.startPersonetics(params);
        };

        this.showLoading = function showLoading(){
            this.el.find("#personetics-inbox-container").append("<div id='perso-loading-wrapper'><div class='loadingTxt'>" + Personetics.dictionary.getText("insightsLoadInsights") + "</div><div class='perso-loading'></div></div>");
        };

        this.hideLoading = function hideLoading(){
            this.el.find("#personetics-inbox-container").find("#perso-loading-wrapper").remove();
        };
        this.startPersonetics = function startPersonetics(params){
            var me = this;
            this.el.siblings().not("#personetics-side-bar").hide();
            $("#personetics-side-bar").attr("class","insights_selected");
            this.el.find('#personetics-inbox-insights').empty().siblings().show();
            var numOfInsightsEl = $("#personetics-side-bar .numOfInsights");
            numOfInsightsEl.addClass("hide");
            numOfInsightsEl.text("");
            this.startTeaser(params);
        };

        this.startTeaser = function startTeaser(params){
            this.hideLoading();
            var me = this;
            var startWidgetConfig = $.extend({}, this.parent.config, true);
            var startWidgetConfig = $.extend(startWidgetConfig, params);
            startWidgetConfig.el = this.el.find("#personetics-story");
            startWidgetConfig.widgetType = "story-widget";
            personetics.startWidget({
                el: this.el,
                widgetType: 'inbox-story-widget',
                lang: myApp.appContext.lang,
                userId: myApp.appContext.userId,
                pserverUrl: myApp.appContext.pserverUrl,
                filter: true,
                eventType: "teaserInboxClick",
                story: startWidgetConfig
            });
        };

        this.callInitPersonetics = function callInitPersonetics(callback){
            personetics.initialize({
                eventsDelegate: new SampleEventDelegate(),
                pserverUrl: this.appContext.pserverUrl,
                userId: this.appContext.userId,
                lang: this.appContext.lang,
                ctxId: this.appContext.ctxId,
                base64EncodeResponse: false, //TODO: should be implicit, and default should be false
                // debugMode: true
            }, callback, callback); //TODO: merge callbacks
        };

        this.bindEvents= function bindEvents(){
            var me = this;
            var goToPage = Personetics.bind(this, this.goToPage)
            this.el.find('#story-button-carousel').bind('click', goToPage);
            this.el.find('.personetics-side-bar-item.dashboard').bind('click', goToPage);
        };

        this.goToPage = function(event)
        {
            samplePage.master.openModule("app");
        };
        this.intialized();
    };

})(window, jQuery, window.Personetics = window.Personetics || {}, window.samplePage = window.samplePage || {});
(function(window, Personetics, $, Handlebars, undefined){

this["Personetics"] = this["Personetics"] || {};
this["Personetics"]["UI"] = this["Personetics"]["UI"] || {};
this["Personetics"]["UI"]["Handlebars"] = this["Personetics"]["UI"]["Handlebars"] || {};
this["Personetics"]["UI"]["Handlebars"]["templates"] = this["Personetics"]["UI"]["Handlebars"]["templates"] || {};

this["Personetics"]["UI"]["Handlebars"]["templates"]["initContainer"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"wrapper\">\r\n    <div class=\"sign-in-wrapper\">\r\n        <div class=\"sign-in\"></div>\r\n        <div class=\"advanced\"></div>\r\n    </div>\r\n        <div class=\"settings\">Sign in settings\r\n            <div class=\"to-advanced\">\r\n                <img src=\"./resources/images/arrow copy 2.svg\" alt=\"arrow\"/>\r\n            </div>\r\n        </div>\r\n        <div class=\"personetics-link\">\r\n            <div>Powered By</div>\r\n            <a href=\"http://personetics.com/\" class=\"img-link\"></a>\r\n        </div>\r\n</div>";
},"useData":true});

this["Personetics"]["UI"]["Handlebars"]["templates"]["loginContainer"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"sign-in-title\">\r\n                            <img src=\"./resources/images/myBank.svg\" alt=\"arrow\"/>\r\n                            <label>SIGN IN</label>\r\n                        </div>\r\n                        <div class=\"input-details\">\r\n                            <div class=\"row\">\r\n                                <label for=\"userId\" class=\"label\">User</label>\r\n                                <input class=\"details\" type=\"text\" id=\"userId\" name=\"userId\"/>\r\n                                <input  class=\"delete-input\" type=\"button\" value=\"x\"/> \r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <label for=\"password\" class=\"label\">Password</label>\r\n                                <input class=\"details\" type=\"password\" id=\"password\" name=\"password\"/>\r\n                                <input  class=\"delete-input\" type=\"button\" value=\"x\"/>                            \r\n                            </div>\r\n                            <div class=\"submit\">\r\n                                <input type=\"button\" id=\"initPersoneticsButton\" name=\"initPersoneticsButton\" value=\"Continue\" />\r\n                            </div>\r\n                        </div>";
},"useData":true});

this["Personetics"]["UI"]["Handlebars"]["templates"]["sampleContainer"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"personetics-insights-inner-container\">\r\n    <div id=\"personetics-background-image\">\r\n        <div id=\"viewAllTeasers\">View All</div>\r\n        <a href=\"#\" id=\"LogOut\">  \r\n            <div id=\"logOutCircle\">\r\n                <div id=\"logOutImageLink\" ></div>\r\n            </div>\r\n            <div id=\"LogOutLink\">LOG OUT</div>\r\n        </a>\r\n        <div id=\"personetics-insights\"></div>\r\n    </div>\r\n</div>";
},"useData":true});

this["Personetics"]["UI"]["Handlebars"]["templates"]["sampleSideBar"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"personetics-side-bar-title\"></div>\r\n    <div class=\"personetics-side-bar-item dashboard\" name=\"dashboard\"><div class=\"personetics-side-bar-item-text\">dashboard</div></div>\r\n    <div class=\"personetics-side-bar-item payments\" name=\"payments\"><div class=\"personetics-side-bar-item-text\">payments</div></div>\r\n    <div class=\"personetics-side-bar-item transfer\" naem=\"transfer\"><div class=\"personetics-side-bar-item-text\">transfer</div></div>\r\n    <div class=\"personetics-side-bar-item statements\" name=\"statements\" ><div class=\"personetics-side-bar-item-text\">statements</div></div>\r\n    <div class=\"personetics-side-bar-item insights\" name=\"insights\" ><div class=\"numOfInsights hide\" ></div><div class=\"personetics-side-bar-item-text\">insights</div></div>\r\n    <div class=\"personetics-side-bar-item assist\" name=\"assist\"><div class=\"personetics-side-bar-item-text\">assist</div></div>\r\n";
},"useData":true});

this["Personetics"]["UI"]["Handlebars"]["templates"]["settingsContainer"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "                        <div class=\"sign-in-title\">\r\n                            <label>SIGN IN SETTINGS</label>\r\n                        </div>\r\n                        <div class=\"input-details\">\r\n                            <div class=\"row fill\">\r\n                                <label for=\"server\" class=\"label\">Server</label>\r\n                                <input class=\"details\" type=\"text\" id=\"url\" name=\"url\"/>\r\n                                <input  class=\"delete-input\" type=\"button\" value=\"x\"/>                            \r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <label for=\"channel\" class=\"label\">Channel</label>\r\n                                <input class=\"details\" type=\"text\" id=\"channel\" name=\"channel\"/>\r\n                                <input  class=\"delete-input\" type=\"button\" value=\"x\"/>          \r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <label for=\"language\" class=\"label\">Language</label>\r\n                                <input class=\"details\" type=\"text\" id=\"lang\" name=\"lang\"/>\r\n                                <input  class=\"delete-input\" type=\"button\" value=\"x\"/>          \r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <input type=\"checkbox\" id=\"mode\" name=\"mode\" /> \r\n                                <label class=\"is-single-teaser\">Is Single Teaser</label>        \r\n                            </div>\r\n                            <div class=\"submit\">\r\n                                <input type=\"button\" id=\"advancedInitPersoneticsButton\" class=\"back-button\" value=\"Done\" />\r\n                            </div>\r\n                        </div>";
},"useData":true});

this["Personetics"]["UI"]["Handlebars"]["templates"]["storyContainer"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.sampleSideBar,depth0,{"name":"sampleSideBar","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div id=\"personetics-story-inner-container\">\r\n    <div class=\"perso-story-inner-top\">\r\n        <div class=\"story-top-title\"></div>\r\n        <div class=\"story-top-buttons-wrapper\">\r\n            <div class=\"story-top-button story-top-button-inbox\">\r\n                <input id=\"story-button-inbox\" type=\"button\" class=\"story-top-button-circle\">\r\n                <div class=\"story-top-button-circle-img\"></div>\r\n                </input>\r\n                <div class=\"story-top-button-text\">INSIGHTS</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"perso-story-inner\">\r\n        <div id=\"personetics-story\"></div>\r\n    </div>\r\n</div>";
},"usePartial":true,"useData":true});})(window, window.Personetics = window.Personetics || {}, jQuery, window.Personetics.UI.Handlebars);

