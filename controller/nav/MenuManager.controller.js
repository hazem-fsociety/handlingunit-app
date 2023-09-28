sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    ], function(Controller, JSONModel) {
        "use strict";

        return Controller.extend("sap.hum.pfe.controller.nav.Menu", {
       
            onInit: function() {
                var oModel = new JSONModel();
                this.getView().setModel(oModel);
                var oDateTime = new Date();
                oModel.setProperty("/dtValue", oDateTime);
                console.log("dtValue:", oModel.getProperty("/dtValue"));
            },

            changeTheme: function() {
                var oCore = sap.ui.getCore();
                var oConfig = sap.ui.getCore().getConfiguration();
              
                if (oConfig.getTheme() === "sap_fiori_3") {
                  oCore.applyTheme("sap_fiori_3_dark");
                } else {
                  oCore.applyTheme("sap_fiori_3");
                }
            },

            logout: function() {
                sessionStorage.clear();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Login");
                location.reload();
            },
            
            navToDashboard: function() {
                this.getOwnerComponent()
                .getRouter()
                .navTo("dashboard")
            },

            navToCreate: function() {
                this.getOwnerComponent()
                .getRouter()
                .navTo("create")
            },
            
            navToPack: function() {
                this.getOwnerComponent()
                .getRouter()
                .navTo("pack")
            },

            navToPrint: function() {
                this.getOwnerComponent()
                .getRouter()
                .navTo("print")
            },

            navToDisplay: function() {
                this.getOwnerComponent()
                .getRouter()
                .navTo("display")
            },

            navToChange: function() {
                this.getOwnerComponent()
                .getRouter()
                .navTo("change")
            },

            navToTransfer: function() {
                this.getOwnerComponent()
                .getRouter()
                .navTo("transfer")
            }

        });
    }
);