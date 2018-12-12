

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
    controls: ol.control.defaults().extend([
      new ol.control.FullScreen({
        source: 'fullscreen'
      })
    ]),
    target: 'map',
    renderer: 'webgl',
    // layers, // NOT DEFINED HERE
    // Improve user experience by loading tiles while animating. Will make
    // animations stutter on mobile or slow devices.
    loadTilesWhileAnimating: true, // is used for old smartphone during the animations
    view: new ol.View({
      center: ol.proj.fromLonLat(initialCoordinatesMap), // Longitude and Latitude 
      zoom: 10
    })
  });

  geocoder();

  // we define here the layer 
  // to maintain the same approach of access to the layers
  // I read the param of url that specify which view I want.
  // if the url has not param i set the default view: OSM
  var m = getUrlParameter('map');
  var t = getUrlParameter('type');
  m == undefined && t == undefined ? setCurrentLayer('OSM', 'osm') : setCurrentLayer(m, t)



  // https://stackoverflow.com/questions/27658280/layer-switching-in-openlayers-3
  $('.selected-layer').click(function (event) {
    event.preventDefault();
    var url = $(this).find('a').attr('href');
    var u = 'http://' + window.location.hostname + window.location.pathname;

    // if i change view for example form user i need to render before the 
    // view and then get the value. This is a constraint of Express 
    // who does not want to render and send object at the same time
    if (u != 'http://127.0.0.1/map') {
      var newUrl = url.replace('map.type', 'map');
      window.location.href = newUrl;
    } else {
      $.ajax({
        dataType: "json",
        url: url,
        method: 'GET',
        success: function (result, status) {
          var type = result.type;
          var mapview = result.map;
          setCurrentLayer(mapview, type)
        },
        error: function (result, status) {
          console.log("ERROR");
          console.log(result);
        }
      })

    }

    return false;
  });




  // Define click debug
  $('.selected-debug').on("click", function (event) {
    event.preventDefault();
    var url = $(this).find('a').attr('href');

    $.ajax({
      dataType: "json",
      url: url,
      method: 'GET',
      success: function (result, status) {
        // var type = result.type;
        // var mapview = result.map;
        defineDebug();

      },
      error: function (result, status) {
        console.log(result);
      }



    });
    return false;
  });


  // default value of filter
  var selectedKernel = normalize(kernels["none"]);

  // render a new Filter
  $('.selected-filter').on("click", function () {
    var filterSelected = $(this).attr("value");
    console.log(filterSelected);
    selectedKernel = normalize(kernels[filterSelected]);
    map.render();
  });


  // Setting filter 
  for (var i = 0; i < groupsMap.length; i++) {
    var layers = groupsMap[i].values_.layers.array_;

    //  This function allows to apply a filter based on a matrix and methods defined
    //  inside filtersMap.js It is called the first time at the begin of 
    //  map (with default value) and then for every change it reload a new Filter.
    //  In this case it is "instantiate" for the first time for every layers even if 
    //  it has not visible
    //  REF: https://openlayers.org/en/latest/examples/image-filter.html

    for (var j = 0; j < layers.length; j++) {
      layers[j].on('postcompose', function (event) {
        convolve(event.context, selectedKernel);
      });
    }
  }

}



function defineDebug(){
  var currentLayers = map.getLayers().getArray();
        var currentLayer = getCurrentLayerByVisible(currentLayers);
        var deb = debugLayer(currentLayer.getSource());
        map.getLayers().getArray().push(deb);
        alertMessage("Zoom in, Zoom out to see the tiles", "info");
}

/**
 * This method draw the view of open layer
 * 
 * @method setCurrentLayer
 * 
 * @param mapview {String} - set the view for example Stamen
 * @param type {String} - set the type of view. For example terrain
 */
function setCurrentLayer(mapview, type) {
  var groupSelected = getGroup(mapview);
  map.setLayerGroup(groupSelected);

  var layers = map.getLayers().getArray();
  var debugLayer = getCurrentLayerByTitle(layers, "Debug");

  // disable debug if active a different view
  if (debugLayer != undefined) {
    var index = layers.indexOf(debugLayer);
    layers.splice(index, 1);
  }

  for (var i = 0; i < layers.length; ++i) {
    if (groupSelected.values_.title === "Bing") {
      layers[i].setVisible(bingStyles[i] === type);
    } else if (groupSelected.values_.title === "Here") {
      layers[i].setVisible(hereStyles[i].scheme === type);
    } else if (groupSelected.values_.title === "Stamen") {
      layers[i].setVisible(stamenStyles[i] === type);
    } else {
      layers[i].setVisible("OSM");
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
        title: "osm",
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
      title: bingStyles[i],
      visible: false,
      preload: Infinity,
      source: new ol.source.BingMaps({
        key: KEY_BING, //'Your Bing Maps Key from http://www.bingmapsportal.com/ here',
        imagerySet: bingStyles[i],
        crossOrigin: 'anonymous'
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
      title: hereStyles[i].scheme,
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
      title: stamenStyles[i],
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
 * @param n {String} - name of group 
 */
function getGroup(n) {
  return groupsMap.find(o => o.values_.title === n);
}


/**
 * Given an array of Layers, this function return a specific Layers
 * that is VISIBLE
 * 
 * @method getCurrentLayerByVisible
 * @param arrayLayers {Object} - contains all layer of specific group 
 */
function getCurrentLayerByVisible(arrayLayers) {
  return arrayLayers.find(o => o.state_.visible === true);
}


/**
 * Given an array of Layers, this function return a specific Layers
 * based on Title
 * 
 * @method getCurrentLayerByVisible
 * @param arrayLayers {Object} - contains all layer of specific group 
 * @param t {String} - Title of layer to search 
 */
function getCurrentLayerByTitle(arrayLayers, t) {
  return arrayLayers.find(o => o.values_.title === t);
}

/**
 * Add a new Layer where add a tile to map for Debug
 * 
 * @method debugLayer
 * @param currentSource {Object} - current Source of Current Layers
 */
function debugLayer(currentSource) {
  var debug = new ol.layer.Tile({
    title: "Debug",
    source: new ol.source.TileDebug({
      projection: 'EPSG:3857',
      tileGrid: currentSource.getTileGrid()
    })
  })
  return debug;
}


/**
 * Based on https://github.com/jonataswalker/ol-geocoder this method define 
 * a Search/Geocoder that implement a Search functionality into an OpenLayer
 * REF: https://stackoverflow.com/a/34067547/4700162
 * 
 * @method geocoder
 */
function geocoder() {

  var p = popup();
  map.addOverlay(p);

  //Instantiate with some options and add the Control
  var geocoder = new Geocoder('nominatim', {
    provider: 'osm',
    lang: 'it-IT',
    placeholder: 'Search for ...',
    limit: 5,
    // key: '....',
    keepOpen: false,
    debug: false,
    autoComplete: true,
    keepOpen: true
  });
  map.addControl(geocoder);


  // I don't want/need Geocoder layer to be visible
  geocoder.getLayer().setVisible(false);

  //Listen when an address is chosen
  geocoder.on('addresschosen', function (evt) {
    var feature = evt.feature;
    var coord = evt.coordinate;
    var address = evt.address;


    // application specific
    // app.addMarker(feature, coord); // TODO ADD MARKERS
    var content = $('#popup-content');
    content.html('<p>You have selected here:</p>' + address.details.name);
    p.setPosition(coord);
  });
}



/**
 * This function allow to create a simple popup that can be 
 * hooked to a map. 
 * The popup is composed of a few basic elements: a container, a close button,
 * and a place for the content.
 * REF: https://openlayers.org/en/latest/examples/popup.html
 * 
 * @method popup
 */
function popup() {
  /**
   * Elements that make up the popup.
   */
  var container = $('#popup')[0];
  var closer = $('#popup-closer')[0];
  /**
   * Create an overlay to anchor the popup to the map.
   */
  var popup = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
  });

  /**
   * Add a click handler to hide the popup.
   * @return {boolean} Don't follow the href.
   */
  closer.onclick = function () {
    popup.setPosition(undefined);
    closer.blur();
    return false;
  };


  return popup;
}