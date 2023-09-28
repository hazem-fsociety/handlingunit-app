sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    'sap/ui/core/Fragment',
    "sap/m/MessageToast"

], function (Controller,History,Fragment,MessageToast) {
    "use strict";

    return Controller.extend("sap.hum.pfe.controller.nav.Print", {

        onInit: function () {
            // Load PDF TEMPLATE.JSON in model
            var oModelPDF = new sap.ui.model.json.JSONModel();
            oModelPDF.loadData("PDFTemplate.json");
            this.getView().setModel(oModelPDF,"oModelPDF");
        },

        showHuData: function() {
            var humInput = this.getView().byId("humInput").getValue(); 
            if (humInput !== "") {
                var huId = this.getView().byId("huId");
                var materialId = this.getView().byId("materialId");
                var productId = this.getView().byId("productId");
                var Desc = this.getView().byId("Desc");
                var batchId = this.getView().byId("batchId");
                var sledId = this.getView().byId("sledId");
                // Read JSON file
                jQuery.getJSON("HU_Print.json", function(data) {
                    // Extract data from JSON data
                    var handlingUnitNumber = data[0]["Handling unit number"];
                    var packagingMaterial = data[0]["Packaging material"];
                    var product = data[0]["Product"];
                    var description = data[0]["Description"];
                    var batch = data[0]["Batch"];
                    var sled = data[0]["SLED"];
                    // Set values
                    huId.setValue(handlingUnitNumber);
                    materialId.setValue(packagingMaterial);
                    productId.setValue(product);
                    Desc.setValue(description);
                    batchId.setValue(batch);
                    sledId.setValue(sled);                    
                });
            } else {
                MessageToast.show("Please fill in the handling units number.");
            }
        },
        
        onPrintHuLabel: function () {
            var humInput = this.getView().byId("humInput").getValue(); 
            if (humInput !== "") {
                var doc = new jsPDF();
                var imgData=this.getView().oModels.oModelPDF.oData.LabelPDF;
                doc.addImage(imgData,'JPEG',0,0,210,297);
                doc.save('HU Label.pdf');
            } else {
                MessageToast.show("Please fill in the handling units number.");
            }
        },

        //cancellation
        cancelAction : function () {
			if (!this.pDialog) {
				this.pDialog = this.loadFragment({
					name: "sap.hum.pfe.view.nav.PrintCancel"
				});
			}
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		}, 

        onCancel: function() {
            this.pDialog.then(function(oDialog){
                oDialog.close();
            });
        },

        onConfirm: function() {
            this.pDialog.then(function(oDialog){
                oDialog.close();
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
