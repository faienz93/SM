

/**
 * ===========================================================================
 * File: Map.js 
 * Author: Antonio Faienza
 * This file contains the settings of map
 * ===========================================================================
 */


function map() {

  defaultOSM();
  bingMaps();
  stamenMap();
  hereMap();

  // When inizialize the map it set with Default OSM
  map = new ol.Map({

    target: 'map',

    // layers: new ol.layer.Group({
    //   title: 'OSM',
    //   layers: [
    //     new ol.layer.Tile({
    //       source: new ol.source.OSM() // Tiled Layer
    //     })
    //   ]
    // }),

    // Improve user experience by loading tiles while animating. Will make
    // animations stutter on mobile or slow devices.
    loadTilesWhileAnimating: true, // is used for old smartphone during the animations
    view: new ol.View({
      center: ol.proj.fromLonLat([11.327591, 44.498955]), // Longitude and Latitude 
      zoom: 12
    })
  });

  // we define here the layer 
  // to maintain the same approach of access to the layers
  var osm = getGroup("OSM");
  map.setLayerGroup(osm);


  var layers = map.getLayers().array_;
  for (var i = 0; i < layers.length; ++i) {
    layers[i].setVisible("OSM");
  }


  // https://stackoverflow.com/questions/27658280/layer-switching-in-openlayers-3
  $('.selected-layer').on("click", function () {
    var layerSelected = $(this).attr("value");
    var groupIdHtml = $(this).parent().attr('id');


    var groupSelected = getGroup(groupIdHtml);
    map.setLayerGroup(groupSelected);
    var layers = map.getLayers().array_;
    for (var i = 0; i < layers.length; ++i) {
      if (groupSelected.values_.title === "Bing") {
        layers[i].setVisible(bingStyles[i] === layerSelected);
      } else if (groupSelected.values_.title === "Here") {
        layers[i].setVisible(hereStyles[i].scheme === layerSelected);
      } else if (groupSelected.values_.title === "Stamen") {
        layers[i].setVisible(stamenStyles[i] === layerSelected);
      } else {
        layers[i].setVisible("OSM");
      }
    }
  });


  var selectedKernel = normalize(kernels["sharpen"]);

  // define a filter
  $('.selected-filter').on("click",function () {
    var filterSelected = $(this).attr("value");
    console.log(filterSelected);
    // return filters matrix
    // var kernels = filterKernel();
    selectedKernel = normalize(kernels[filterSelected]);
    map.render();
  
    // applyFilter(map.getLayers().array_,selectedKernel);
  });


  console.log(groupsMap);
  // TODO delete
  // console.log(groupsMap[0].values_.layers.array_);
  // for(var i = 0; i < groupsMap.length; i++){ 
  //   var layers = groupsMap[i].values_.layers.array_;
  //   // var layers = groupsMap.getLayers().array_;
  //   for (var i = 0; i < layers.length; i++) {
  //       layers[i].on('postcompose', function (event) {
  //         convolve(event.context, selectedKernel);
  //       });
  //   }
  // }

  var layers = groupsMap[0].values_.layers.array_;
  // var layers = groupsMap.getLayers().array_;
  for (var i = 0; i < layers.length; i++) {
    layers[i].on('postcompose', function (event) {
      convolve(event.context, selectedKernel);
    });
  }

  var layers = groupsMap[1].values_.layers.array_;
  // var layers = groupsMap.getLayers().array_;
  for (var i = 0; i < layers.length; i++) {
    layers[i].on('postcompose', function (event) {
      convolve(event.context, selectedKernel);
    });
  }

  var layers = groupsMap[2].values_.layers.array_;
  // var layers = groupsMap.getLayers().array_;
  for (var i = 0; i < layers.length; i++) {
    layers[i].on('postcompose', function (event) {
      convolve(event.context, selectedKernel);
    });
  }

  var layers = groupsMap[3].values_.layers.array_;
  // var layers = groupsMap.getLayers().array_;
  for (var i = 0; i < layers.length; i++) {
    layers[i].on('postcompose', function (event) {
      convolve(event.context, selectedKernel);
    });
  }

  // for(var i = 0; i < groupsMap.length; i++){ 
  //   applyFilter(groupsMap[i].values_.layers.array_,selectedKernel);
  // }
  


}

function ciao(d){
  console.log(d);
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
        visible: false,
        preload: Infinity,
        source: new ol.source.OSM() // Tiled Layer
      })
    ]
  });

  // return layersOSM;
  groupsMap.push(layersOSM);
}

/**
 * Based on tutorial: https://openlayers.org/en/latest/examples/bing-maps.html
 * I Define a layer of Bing. For doing this i Set a KEY from http://www.bingmapsportal.com/ 
 * 
 * @method bingMaps
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

  // return bingLayers;
  groupsMap.push(bingLayers);


}

/**
 * Based on tutorial: https://openlayers.org/en/latest/examples/here-maps.html 
 * I Define a layer of Here WeGo Map. For doing this i Set appId and appCode from https://developer.here.com/
 * 
 * @method hereMap
 */
function hereMap() {

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
          '<a href="http://developer.here.com">HERE</a>',
        crossOrigin: 'anonymous' // https://gis.stackexchange.com/questions/199540/avoiding-cors-error-with-openlayers-3
      })
    }));
  }

  var hereLayers = new ol.layer.Group({
    title: "Here",
    layers: layers
  });

  // return hereLayers
  groupsMap.push(hereLayers);

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
  // return stamenLayers;
  groupsMap.push(stamenLayers);

}


/**
 * Given an array of Group, this function return a specific group
 * that has a specific Title
 * 
 * @method getGroup
 * @param l {String} - name of group 
 */
function getGroup(n) {
  return groupsMap.find(o => o.values_.title === n);
}






/**
 * This function allows to apply a filter based on a matrix and methods defined
 * inside filtersMap.js It is called the first time at the begin of 
 * map (with default value) and then for every change it reload a new Filter.
 * REF: https://openlayers.org/en/latest/examples/image-filter.html
 * 
 * @method applyFilter
 */
function applyFilter(layers, selectedKernel) {
  for (var i = 0; i < layers.length; i++) {
    layers[i].on('postcompose', function (event) {
      convolve(event.context, selectedKernel);
    });
  }
}

