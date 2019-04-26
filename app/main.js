"use strict";
exports.__esModule = true;
var EsriMap = require("esri/Map");
var FeatureLayer = require("esri/layers/FeatureLayer");
var PopupTemplate = require("esri/PopupTemplate");
var MapView = require("esri/views/MapView");
var Expand = require("esri/widgets/Expand");
var Search = require("esri/widgets/Search");
var Legend = require("esri/widgets/Legend");
var Home = require("esri/widgets/Home");
var Locate = require("esri/widgets/Locate");
var BasemapToggle = require("esri/widgets/BasemapToggle");
var Print = require("esri/widgets/Print");
var LayerList = require("esri/widgets/LayerList");
var fLayer = new FeatureLayer({
    url: "http://services.arcgis.com/p3UBboyC0NH1uCie/arcgis/rest/services/LA_Crime_WebMap/FeatureServer/0",
    definitionExpression: "GANG_RELATED = 'YES'",
    outFields: ["*"]
});
var template = new PopupTemplate({
    title: "{TYPE}",
    content: "<p>{CATEGORY}</p>" +
        "<ul><li>Description: {STAT_DESC}</li>" +
        "<li>City: {CITY}</li><ul>"
});
fLayer.popupTemplate = template;
var map = new EsriMap({
    basemap: "dark-gray",
    layers: [fLayer]
});
var view = new MapView({
    center: [-118.174, 34.024],
    zoom: 14,
    container: "viewDiv",
    map: map,
    ui: {
        components: ["zoom", "compass", "attribution"]
    }
});
var legend = new Legend({
    view: view,
    layerInfos: [{
            layer: fLayer,
            title: "Crimes"
        }]
});
var searchWidget = new Search({
    view: view,
    container: document.createElement("div")
});
var homeWidget = new Home({
    view: view
});
var locateWidget = new Locate({
    view: view
});
var basemapToggle = new BasemapToggle({
    view: view,
    nextBasemap: "hybrid"
});
var print = new Print({
    view: view,
    container: document.createElement("div"),
    printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
});
var layerList = new LayerList({
    view: view,
    container: document.createElement("div")
});
var lgndExpand = new Expand({
    view: view,
    content: legend,
    expandIconClass: "esri-icon-layers"
});
var searchExpand = new Expand({
    view: view,
    content: searchWidget,
    expandIconClass: "esri-icon-search"
});
var printExpand = new Expand({
    view: view,
    content: print,
    expandIconClass: "esri-icon-printer"
});
var listExpand = new Expand({
    view: view,
    content: layerList,
    expandIconClass: "esri-icon-layer-list"
});
view.ui.add(lgndExpand, "bottom-right");
view.ui.add(searchExpand, "top-right");
view.ui.add(printExpand, "top-right");
view.ui.add(listExpand, "top-right");
view.ui.add(homeWidget, "top-left");
view.ui.add(locateWidget, "top-left");
view.ui.add(basemapToggle, "bottom-left");
