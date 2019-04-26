import * as EsriMap from "esri/Map";
import * as VectorTileLayer from "esri/layers/VectorTileLayer";
import * as FeatureLayer from  "esri/layers/FeatureLayer";
import * as PopupTemplate from    "esri/PopupTemplate"; 
import * as MapView from   "esri/views/MapView";
import * as Expand from  "esri/widgets/Expand";
import * as Search from  "esri/widgets/Search";
import * as Legend from  "esri/widgets/Legend";
import * as Home from  "esri/widgets/Home";
import * as Locate from  "esri/widgets/Locate";
import * as BasemapToggle  from  "esri/widgets/BasemapToggle";
import * as Print  from  "esri/widgets/Print";
import * as LayerList from  "esri/widgets/LayerList";

const fLayer = new FeatureLayer({
    url: "http://services.arcgis.com/p3UBboyC0NH1uCie/arcgis/rest/services/LA_Crime_WebMap/FeatureServer/0",
    definitionExpression: "GANG_RELATED = 'YES'",
    outFields: ["*"]
});

const template = new PopupTemplate({
    title: "{TYPE}",
    content: "<p>{CATEGORY}</p>" +
    "<ul><li>Description: {STAT_DESC}</li>" +
    "<li>City: {CITY}</li><ul>"
});

fLayer.popupTemplate = template;

    const map = new EsriMap({
        basemap: "dark-gray",
        layers: [fLayer]
    });

    const view = new MapView({
        center: [-118.174, 34.024],
        zoom: 14,
        container: "viewDiv",
        map: map,
        ui: {
            components: ["zoom", "compass", "attribution"]
        }
    });

    const legend = new Legend({
        view: view,
        layerInfos: [{
            layer: fLayer,
            title: "Crimes"
        }]});

    const searchWidget = new Search({
        view: view,
        container: document.createElement("div")
    });

    const homeWidget = new Home({
        view: view
    });

    const locateWidget = new Locate({
        view: view
    });

    const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "hybrid"
    });

    const print = new Print({
        view: view,
        container: document.createElement("div"),
        printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
    });

    const layerList = new LayerList({
      view: view,
      container: document.createElement("div"),
    });

    const lgndExpand = new Expand({
        view: view,
        content: legend,
        expandIconClass: "esri-icon-layers"
    });

    const searchExpand = new Expand({
        view: view,
        content: searchWidget,
        expandIconClass: "esri-icon-search"
    });

    const printExpand = new Expand({
        view: view,
        content: print,
        expandIconClass: "esri-icon-printer"
    });

    const listExpand = new Expand({
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
