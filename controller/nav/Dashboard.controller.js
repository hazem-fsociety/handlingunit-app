sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    'sap/ui/core/Fragment',
    "sap/m/MessageToast"

], function(Controller, History, Fragment,MessageToast) {
    "use strict";

    return Controller.extend("sap.hum.pfe.controller.nav.Dashboard", {

        //navigation
        logout: function() {
            sessionStorage.clear();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Login");
            location.reload();
        },
        
        navBack: function() {
            var sPreviousHash = History.getInstance().getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.back();
            } else {
                this.getOwnerComponent().getRouter().navTo("menu", {}, true);
            }
        }

    });
});
