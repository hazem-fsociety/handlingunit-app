sap.ui.define(["sap/hum/pfe/controller/BaseController"], function(Controller) {
    "use strict";

    return Controller.extend("sap.hum.pfe.controller.Login", {

        changeTheme: function() {
			var oCore = sap.ui.getCore();
			var oConfig = sap.ui.getCore().getConfiguration();
		  
			if (oConfig.getTheme() === "sap_fiori_3") {
			  oCore.applyTheme("sap_fiori_3_dark");
			} else {
			  oCore.applyTheme("sap_fiori_3");
			}
		},

        navToNotFound: function() {
            this.getOwnerComponent()
                .getRouter()
                .getTargets()
                .display("notFound");
        },

        onBtnClick : function(){
			var oUser = this.getView().byId("user").getValue();
			var oPwd = this.getView().byId("pwd").getValue();   
			
			if (oUser==="HMHIMED" && oPwd==="0000"){				
                this.getOwnerComponent()
                .getRouter()
                .navTo("menu")
			}
			else if (oUser==="ADMIN" && oPwd==="0000"){
				this.getOwnerComponent()
                .getRouter()
                .navTo("menu2")
			}
			else{
				sap.m.MessageToast.show("The username or password you have entered is incorrect.");
			}
		}

    });
});