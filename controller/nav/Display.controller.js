sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(Controller, JSONModel, History, ResourceModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("sap.hum.pfe.controller.nav.Display", {

        onInit: function() {
            var oModel = new JSONModel();
            this.getView().setModel(oModel);
            var sFilePath = "mock/HU_List.json";
            oModel.loadData(sFilePath);
            var oResourceModel = new ResourceModel({
                bundleName: "sap.hum.pfe.i18n.i18n"
            });
            this.getView().setModel(oResourceModel, "i18n");
        },

        onLiveChange: function() {
            var aFilters = [];
            var oTable = this.byId("idHuTable");
        
            // Get the search field values
            var sHandlingUnit = this.byId("searchField1").getValue();
            var sStorageLocation = this.byId("searchField2").getValue();
            var sBatch = this.byId("searchField3").getValue();
        
            // Build the filters for each search field
            if (sHandlingUnit) {
                aFilters.push(new Filter("Handling Unit number", FilterOperator.Contains, sHandlingUnit));
            }
            if (sStorageLocation) {
                aFilters.push(new Filter("Storage location", FilterOperator.Contains, sStorageLocation));
            }
            if (sBatch) {
                aFilters.push(new Filter("Batch", FilterOperator.Contains, sBatch));
            }
        
            // Apply the filters to the table binding
            oTable.getBinding("items").filter(aFilters);
        },
        
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
