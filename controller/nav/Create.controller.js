sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    'sap/ui/core/Fragment',
    "sap/m/MessageToast"

    ], function(Controller, History,Fragment,MessageToast) {
        "use strict";

        return Controller.extend("sap.hum.pfe.controller.nav.Create", {

            onShowHuIden: function () {
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "sap.hum.pfe.view.nav.HuIdentfierType"
                    });
                }
                this.pDialog.then(function(oDialog) {
                    oDialog.open();
                });
            },

            onChoose: function(event) {
                var selectedItem = event.getParameter("selectedItem");
                if (selectedItem) {
                  var selectedHU = selectedItem.getTitle();
                  var oInput = this.getView().byId("HuIden");
                  oInput.setValue(selectedHU);
                }
            },
            
            GenerateHU: function() {
                var pmInput = this.getView().byId("pmInput");
                var packagingMaterial = pmInput.getValue();
            
                if (packagingMaterial) {
                    var handlingUnitNumber = Math.floor(Math.random() * 9000) + 10000000;
                    this.getView().byId("hucInput").setValue(handlingUnitNumber);
                    this.getView().byId("packMatInput").setValue(packagingMaterial);
                } else {
                    // Handle the case when the input is empty
                    MessageToast.show("Please fill in the packaging material.");
                }
            },
            
            saveAction: function() {
                var hucInput = this.getView().byId("hucInput").getValue();
                var packMatInput = this.getView().byId("packMatInput").getValue();
            
                // Check if hucInput and packMatInput are not empty
                if (hucInput && packMatInput) {
                    // Inputs are not empty, execute the save action
                    MessageToast.show("Handling units number " + hucInput + " were successfully created.", {
                        duration: 2000 // 2 seconds
                    });
                setTimeout(function() {
                    location.reload(); 
                    }.bind(this), 2000);    
                } else {
                    // Inputs are empty, display an error message or handle the empty case as needed
                    MessageToast.show("Please fill in all required fields.");
                }
            },            

            //cancellation
            cancelAction : function () {
                if (!this.pDialog2) {
                    this.pDialog2 = this.loadFragment({
                        name: "sap.hum.pfe.view.nav.CreateCancel"
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