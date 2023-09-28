sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    'sap/ui/core/Fragment',
    "sap/m/MessageToast"

    ], function(Controller, History,Fragment,MessageToast) {
        "use strict";

        return Controller.extend("sap.hum.pfe.controller.nav.Transfer", {

            onShowSloc: function () {
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "sap.hum.pfe.view.nav.Sloc"
                    });
                }
                this.pDialog.then(function(oDialog) {
                    oDialog.open();
                });
            },
    
            onChooseSloc: function(event) {
                var selectedItem = event.getParameter("selectedItem");
                if (selectedItem) {
                  var selectedProduct = selectedItem.getTitle();
                  var oInput = this.getView().byId("slInput");
                  oInput.setValue(selectedProduct);
                }
            },
            
            saveAction: function() {
                var huInput = this.getView().byId("huInput");
                var slInput = this.getView().byId("slInput");
            
                var handlingUnitNumber = huInput.getValue();
                var shipmentNumber = slInput.getValue();
            
                if (handlingUnitNumber && shipmentNumber) {
                    MessageToast.show("Packaging data was saved. Material document 49023265 was created.", {
                        duration: 2000 // 2 seconds
                    });
            
                    setTimeout(function() {
                        location.reload(); 
                    }.bind(this), 2000);
                } else {
                    // Handle the case when inputs are empty
                    MessageToast.show("Please fill in all required fields.");
                }
            },            

            //cancellation
            cancelAction : function () {
                if (!this.pDialog2) {
                    this.pDialog2 = this.loadFragment({
                        name: "sap.hum.pfe.view.nav.TransferCancel"
                    });
                }
                this.pDialog2.then(function(oDialog2) {
                    oDialog2.open();
                });
            }, 

            onCancel: function() {
                this.pDialog2.then(function(oDialog2){
                    oDialog2.close();
                });
            },

            onConfirm: function() {
                this.pDialog2.then(function(oDialog2){
                    oDialog2.close();
                });
                location.reload();
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
    }
);