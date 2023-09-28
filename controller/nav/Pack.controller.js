sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    'sap/ui/core/Fragment',
    "sap/m/MessageToast"

], function(Controller, History, Fragment,MessageToast) {
    "use strict";

    return Controller.extend("sap.hum.pfe.controller.nav.Pack", {

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
              var oInput = this.getView().byId("sLocInput");
              oInput.setValue(selectedProduct);
            }
        },

        saveAction: function() {
            var orderInput = this.getView().byId("orderInput");
            var confirmationInput = this.getView().byId("confirmationInput");
            var sLocInput = this.getView().byId("sLocInput");

            var orderNumber = orderInput.getValue();
            var confirmationNumber = confirmationInput.getValue();
            var sLocInput = sLocInput.getValue();

            if (orderNumber && confirmationNumber && sLocInput) {
                MessageToast.show("Order " + orderNumber + " is successfully packed.", {
                    duration: 2000 // 2 seconds
                });
        
                setTimeout(function() {
                    location.reload(); 
                }.bind(this), 2000);
                
            } else {
                MessageToast.show("Please fill in all required fields.");
            }
        },

        //cancellation
        cancelAction : function () {
			if (!this.pDialog2) {
				this.pDialog2 = this.loadFragment({
					name: "sap.hum.pfe.view.nav.PackCancel"
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
});
