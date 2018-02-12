(function(window, Personetics, $, undefined){

    var map = function map() {
        this.images = {
            "teaser_images": {
                "default": "CG100",
                "CG100": "CG100",
                "Transport": "CG100",
                "Transportion": "CG100",
                "Transportation": "CG100",
                "CG1000": "CG1000",
                "Household": "CG1000",
                "CG10000": "CG10000",
                "Groceries": "CG10000",
                "Supermarkets": "CG10000",
                "CG2000": "CG700",
                "Services": "CG700",
                "CG300": "CG300",
                "Utilities": "CG300",
                "CG3000": "CG3000",
                "Travel": "CG3000",
                "CG500": "CG500",
                "Entertainment": "CG500",
                "CG600": "CG600",
                "Shopping": "CG600",
                "CG6000": "CG6000",
                "Education": "CG6000",
                "CG700": "CG700",
                "Finances": "CG700",
                "Finance": "CG700",
                "CG8": "CG8",
                "Taxes": "CG8",
                "CG800": "CG800",
                "Dining": "CG800",
                "CG900": "CG900",
                "Health": "CG900",
                "HazarAttentionSign": "HazardAttentionSign",
                "HazardAttentionSign": "HazardAttentionSign",
                "IntroducePersonetics": "IntroducePersonetics",
                "PersoAutomation": "PersoAutomation",
                "PersoCards": "PersoCards",
                "PersoCurrency": "PersoCurrency",
                "PersoDeposit": "PersoDeposit",
                "PersoExplain": "PersoExplain",
                "Persofees": "Persofees",
                "PersoFees": "Persofees",
                "PersoMobileBanking": "PersoMobileBanking",
                "PersoMobileWallet": "PersoMobileWallet",
                "PersoQuiz": "PersoQuiz",
                "PersoRefund": "PersoRefund",
                "PersoSavings": "PersoSavings"
            },
            "account_selector": {
                "default": "cardImage",
                "0": "cardImage"
            },
            "icons": {
                "default": "welcome",
                "travel activity": "travel_activity",
                "spend activity": "spend_activity",
                "payments": "payments",
                "debits _ purchases": "debits_purchases",
                "credit_refunds": "credit_refunds",
                "collections_past due": "collections_past_due",
                "collection_past due": "collections_past_due",
                "balance status": "balance_status",
                "account info": "account_info"
            }
        }
    };

    map.prototype.getImageClass = function getImageClass(imageId, file){
        var urlObj ={
            isAbsoluteURL:false,
            url:imageId
        };
        if(typeof imageId != undefined && imageId != null) {
            if (imageId.indexOf("http") == 0) {
                urlObj.isAbsoluteURL = true;
                return urlObj;
            }
        }
        if(typeof file != undefined && this.images.hasOwnProperty(file)){
            var images = this.images[file];
            urlObj.url = images.hasOwnProperty(imageId)? images[imageId]: images["default"];
            return urlObj;
        }
        Personetics.log("Personetics.imageMap.getText('" + imageId + "', '" + file + "') Error: unknown " + file);
        return urlObj;
    };

    map.prototype.overrideImages = function overrideImages(file, images) {
        if(!this.images.hasOwnProperty(file)) {
            this.images[file] = images;
        }
        else {
            for(var imageID in images) {
                if(images.hasOwnProperty(imageID)) {
                    this.images[file][imageID] = images[imageID];
                }
            }
        }
    };

    Personetics.imageMap = new map();

})(window, window.Personetics = window.Personetics || {}, jQuery);

