

/**
 * ===========================================================================
 * File: Map.js 
 * Author: Antonio Faienza
 * This file contains the settings of map
 * ===========================================================================
 */


function map() {

  var osm = defaultOSM();
  var bing = bingMaps();
  var stamen = stamenMap();
  var here = hereMap();

  // When inizialize the map it set with Default OSM
  map = new ol.Map({
    target: 'map',
    layers: new ol.layer.Group({
      title: 'OSM',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM() // Tiled Layer
        })
      ]
    }),
    // Improve user experience by loading tiles while animating. Will make
    // animations stutter on mobile or slow devices.
    loadTilesWhileAnimating: true, // is used for old smartphone during the animations
    view: new ol.View({
      center: ol.proj.fromLonLat([11.327591, 44.498955]), // Longitude and Latitude 
      zoom: 12
    })
  });



  // https://stackoverflow.com/questions/27658280/layer-switching-in-openlayers-3
  $('.selected-layer').on("click", function () {
    var layerSelected = $(this).attr("value");
    var parentId = $(this).parent().attr('id');
    // console.log(stamen.values_.title + " " + parentId);
    if (stamen.values_.title == parentId) {
      map.setLayerGroup(stamen);      
      var layers = map.getLayers().array_;
      for (var i = 0; i < layers.length; ++i) {      
          layers[i].setVisible(stamenStyles[i] === layerSelected);      
      }
    } else if (bing.values_.title == parentId) {
      map.setLayerGroup(bing);
      var layers = map.getLayers().array_;
      for (var i = 0; i < layers.length; ++i) {
        layers[i].setVisible(bingStyles[i] === layerSelected);
      }
    } else if(here.values_.title == parentId){
        map.setLayerGroup(here);
        var layers = map.getLayers().array_;
        for (var i = 0; i < layers.length; ++i) {
          layers[i].setVisible(hereStyles[i].scheme === layerSelected);
        }      
    }
    // if (layerSelected === "stamen") {
    //   map.setLayerGroup(stamen);
    // }
    // else if (layerSelected === "osm") {
    //   map.setLayerGroup(osm);
    // } else {
    //   map.setLayerGroup(bing);
    //   var layers = map.getLayers().array_;
    //   for (var i = 0; i < layers.length; ++i) {
    //     layers[i].setVisible(bingStyles[i] === layerSelected);
    //   }
    // }
  });


  var selectedKernel = normalize(kernels["none"]);

  // define a filter
  $('.selected-filter').click(function () {
    var filterSelected = $(this).attr("value");
    console.log(filterSelected);
    // return filters matrix
    // var kernels = filterKernel();
    selectedKernel = normalize(kernels[filterSelected]);
    map.render();
  });

  // applyFilter(selectedKernel);
  var layers = map.getLayers().array_;
  for (var i = 0; i < layers.length; i++) {
    // this check is util for the Group that contains more Layers i.e Bing or Stamen
    if (layers[i].getVisible()) {
      layers[i].on('postcompose', function (event) {
        convolve(event.context, selectedKernel);
      });
    }
  }

}

/**
 * This function return a default OSM
 * 
 * @method defaultOSM
 */
function defaultOSM() {

  var layersOSM = new ol.layer.Group({
    title: 'OSM',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM() // Tiled Layer
      })
    ]
  });

  return layersOSM;
}

/**
 * Based on tutorial: https://openlayers.org/en/latest/examples/bing-maps.html
 * I Define a layer of Bing. For doing this i Set a KEY from http://www.bingmapsportal.com/ 
 */
function bingMaps() {
  var layers = [];
  var i;
  for (i = 0; i < bingStyles.length; ++i) {
    layers.push(new ol.layer.Tile({
      visible: false,
      preload: Infinity,
      source: new ol.source.BingMaps({
        key: KEY_BING, //'Your Bing Maps Key from http://www.bingmapsportal.com/ here',
        imagerySet: bingStyles[i]
        // use maxZoom 19 to see stretched tiles instead of the BingMaps
        // "no photos at this zoom level" tiles
        // maxZoom: 19
      })
    }));
  }

  var bingLayers = new ol.layer.Group({
    title: "Bing",
    layers: layers
  });

  return bingLayers;
}

/**
 * Based on tutorial: https://openlayers.org/en/latest/examples/bing-maps.html
 * I Define a layer of Here WeGo Map. For doing this i Set appId and appCode from https://developer.here.com/
 */
function hereMap(){

  var urlTpl = 'https://{1-4}.{base}.maps.cit.api.here.com' +
  '/{type}/2.1/maptile/newest/{scheme}/{z}/{x}/{y}/256/png' +
  '?app_id={app_id}&app_code={app_code}';
  var layers = [];
      for (var i = 0; i < hereStyles.length; ++i) {
        var layerDesc = hereStyles[i];
        layers.push(new ol.layer.Tile({
          visible: false,
          preload: Infinity,
          source: new ol.source.XYZ({
            url: createUrl(urlTpl, layerDesc),
            attributions: 'Map Tiles &copy; ' + new Date().getFullYear() + ' ' +
              '<a href="http://developer.here.com">HERE</a>'
          })
        }));
      }

      var hereLayers = new ol.layer.Group({
        title: "Here",
        layers: layers
      });

      return hereLayers
}

/**
 * This function return a stamen layer
 * REF: https://openlayers.org/en/latest/examples/stamen.html?q=OSM
 * 
 * @method stamenMap
 */
function stamenMap() {
  var layers = [];
  var i;
  for (i = 0; i < stamenStyles.length; ++i) {    
      layers.push(new ol.layer.Tile({
        visible: false,
        preload: Infinity,
        source: new ol.source.Stamen({
          layer: stamenStyles[i]
        })
      }));
  }

  var stamenLayers = new ol.layer.Group({
    title: "Stamen",
    layers: layers
  });

  // console.log(stamenLayers.values_.title);
  // console.log(map.getLayers().array_[0].getVisible()); 
  return stamenLayers;
}

/**
 * This function allows to apply a filter based on a matrix and methods defined
 * inside filtersMap.js It is called the first time at the begin of 
 * map (with default value) and then for every change it reload a new Filter.
 * REF: REF: https://openlayers.org/en/latest/examples/image-filter.html
 * 
 * @method applyFilter
 */
function applyFilter(selectedKernel) {
  var layers = map.getLayers().array_;
  for (var i = 0; i < layers.length; i++) {
    // this check is util for the Group that contains more Layers i.e Bing or Stamen
    if (layers[i].getVisible()) {
      layers[i].on('postcompose', function (event) {
        convolve(event.context, selectedKernel);
      });
    }
  }
}

