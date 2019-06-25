import { Component, h, Prop, Element } from "@stencil/core";
import { MatchResults, RouterHistory } from "@stencil/router";
import { loadCss, loadModules } from "esri-loader";

@Component({
  tag: "app-map",
  styleUrl: "app-map.scss"
})
export class AppMap {
  @Element() hostElement: HTMLElement;
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  /**
   * esri-loader options
   */
  esriMapOptions = {
    url: `https://js.arcgis.com/4.7/`
  };

  /**
   * Properties to hold the map, mapview and featurelayer
   */
  esriMap: __esri.Map;
  esriMapView: __esri.MapView;
  municipalitiesFeatureLayer: __esri.FeatureLayer;

  constructor() {
    loadCss(`${this.esriMapOptions.url}/esri/css/main.css`);

    loadModules(
      ["esri/Map", "esri/layers/FeatureLayer"],
      this.esriMapOptions
    ).then(
      ([EsriMap, FeatureLayer]: [
        __esri.MapConstructor,
        __esri.FeatureLayerConstructor
      ]) => {
        this.esriMap = new EsriMap({
          basemap: "streets"
        });

        this.municipalitiesFeatureLayer = new FeatureLayer({
          url:
            "https://services.arcgis.com/Li1xnxaTwJ2lGrgz/arcgis/rest/services/Kommuner/FeatureServer/0"
        });

        this.esriMap.add(this.municipalitiesFeatureLayer);
      }
    );
  }

  componentDidUpdate() {
    console.log("component update");
    this.zoomToUrlObjectId(600);
  }

  /**
   * The component is loaded and has rendered.
   * Only called once per component lifecycle
   */
  componentDidLoad() {
    this.createEsriMapView()
      .then(() => this.zoomToUrlObjectId())
      .then(() => this.addZoomOnClickAndUrlUpdate());
  }

  /**
   * Creates the mapview used in the application
   */
  createEsriMapView() {
    return loadModules(["esri/views/MapView"], this.esriMapOptions).then(
      ([EsriMapView]: [__esri.MapViewConstructor]) => {
        const mapDiv = this.hostElement.querySelector("div");

        this.esriMapView = new EsriMapView({
          container: mapDiv,
          zoom: 4,
          center: [15, 65],
          map: this.esriMap
        });
      }
    );
  }

  /**
   * Zooms to objectid passed in url map/{objectid}
   */
  zoomToUrlObjectId(duration = 1600) {
    if (this.match && this.match.params && this.match.params.objectid) {
      this.municipalitiesFeatureLayer
        .queryFeatures({
          where: "objectid = " + this.match.params.objectid,
          num: 1,
          returnGeometry: true
        })
        .then(results => {
          if (results.features.length) {
            const firstResult = results.features[0];
            this.zoomToAndHighlighFeature(firstResult, duration);
          }
        });
    }
  }

  zoomToAndHighlighFeature(feature: __esri.Graphic, duration = 1600) {
    this.esriMapView.when(() => {
      const symbol = {
        type: "simple-fill",
        color: [51, 51, 204, 0.9],
        style: "solid",
        outline: {
          color: "white",
          width: 1
        }
      };

      const highlightPolygon = feature.clone();
      highlightPolygon.set("symbol", symbol);

      this.esriMapView.graphics.removeAll();
      this.esriMapView.graphics.add(highlightPolygon);

      this.esriMapView.goTo(feature.geometry, {
        duration: duration,
        easing: "ease-in"
      });
    });
  }

  addZoomOnClickAndUrlUpdate() {
    this.esriMapView.on("click", evt => {
      this.esriMapView
        .whenLayerView(this.municipalitiesFeatureLayer)
        .then((lyrView: __esri.FeatureLayerView) => {
          lyrView.queryFeatures().then(results => {
            results.features.some(f => {
              const polygon = f.geometry as __esri.Polygon;
              if (polygon.contains(evt.mapPoint)) {
                this.history.push(`/map/${f.attributes.ObjectId}`, {});
                this.zoomToAndHighlighFeature(f, 500);
                return true;
              }
              return false;
            });
          });
        });
    });
  }

  render() {
    return <div class="app-map" />;
  }
}
