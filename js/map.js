/**
 * ===========================================================================
 * File: Map.js 
 * Author: Antonio Faienza
 * This file contains the settings of map
 * ===========================================================================
 */


function settingMap() {
  defaultOSM();
  bingMaps();
  stamenMap();
  hereMap();

  $('.selected-debug').on("click", function (event) {
    event.preventDefault();
    defineDebug();
    return false;
  });

  // default value of filter
  var selectedKernel = normalize(kernels["none"]);

  // render a new Filter
  $('.selected-filter').on("click", function () {
    var filterSelected = $(this).attr("value");
    console.log(filterSelected); // TODO delete
    selectedKernel = normalize(kernels[filterSelected]);
    globalMap.render();
  });



  $('.selected-metric').on('click', function () {
    var setPreferenceColor = $(this).attr('value');
    var user = $("#authentication-name").attr('value');
    var user_json = jQuery.parseJSON(user);
    var layers = globalMap.getLayers().getArray();
    var markersLayer = getCurrentLayerByTitle(layers, "markers");
    if (setPreferenceColor == "pdr" && markersLayer != undefined) {    
      applyMarkersMetric(markersLayer, user_json.settings.pdr, "pdr");
    } else if (setPreferenceColor == "delay" && markersLayer != undefined) {
      applyMarkersMetric(markersLayer, user_json.settings.delay, "delay");
    } else if (setPreferenceColor == "throughput" && markersLayer != undefined) {
      applyMarkersMetric(markersLayer, user_json.settings.throughput, "throughput");
    } else if(markersLayer != undefined) {
      for (var i = 0, len = markersLayer.getSource().getFeatures().length; i < len; i++) {
        markersLayer.getSource().getFeatures()[i].setStyle(new ol.style.Style({
          image: new ol.style.Icon(/** @type {module:ol/style/Icon~Options} */({ // /** @type {olx.style.IconOptions} */
            color: "#FF0000", 
            crossOrigin: 'anonymous',
            src: '/img/dot.png'
          }))
        }));

      }
    }
  });



  // Setting filter 
  for (var i = 0, len = groupsMap.length; i < len; i++) {
    var layers = groupsMap[i].values_.layers.array_;

    //  This function allows to apply a filter based on a matrix and methods defined
    //  inside filtersMap.js It is called the first time at the begin of 
    //  map (with default value) and then for every change it reload a new Filter.
    //  In this case it is "instantiate" for the first time for every layers even if 
    //  it has not visible
    //  REF: https://openlayers.org/en/latest/examples/image-filter.html

    for (var j = 0, layerlen = layers.length; j < layerlen; j++) {
      layers[j].on('postcompose', function (event) {
        convolve(event.context, selectedKernel);
      });
    }
  }


  $('.selected-view').on("click", function () {
    // get the value from dropdown inside navbar
    var actualValueView = $(this).attr("value");
    
    // var actualValueView = $('.selected-view').attr("value");
  // $('.selected-view').removeClass('active')
    console.log(actualValueView);
    setMarkersView( actualValueView);
  });


}

function createMap(m = "OSM", t = "osm") {

  // When inizialize the map it set with Default OSM
  globalMap = new ol.Map({
    controls: ol.control.defaults().extend([
      new ol.control.FullScreen()
    ]),
    target: 'map',
    renderer: 'webgl',
    // layers, // NOT DEFINED HERE
    // Improve user experience by loading tiles while animating. Will make
    // animations stutter on mobile or slow devices.
    loadTilesWhileAnimating: true, // is used for old smartphone during the animations
    view: new ol.View({
      center: ol.proj.fromLonLat(initialCoordinatesMap), // Longitude and Latitude 
      zoom: 12
    })
  });

  geocoder();
  setCurrentLayer(m, t);

}

/**
 * Thanks this method we color the markers. Based on the preference and metrics param 
 * we check the experiment value (i.e pdr) respect the range defined from the user.
 * When it's find the corrispective range we apply the color assigned to this range
 * 
 * @method applyMarkersMetric
 * @param markersLayer the layer of Markers
 * @param preference the preference of the user
 * @param metrics the type of metrics from pdr, delay and throughput 
 */
function applyMarkersMetric(markersLayer, preference, metrics){

  for (var i = 0, len = markersLayer.getSource().getFeatures().length; i < len; i++) {
    // This is the experiment value
    var experiment_value;
    if(metrics === "pdr") experiment_value = markersLayer.getSource().getFeatures()[i].getProperties().pdr;
    else if(metrics === "delay") experiment_value = markersLayer.getSource().getFeatures()[i].getProperties().delay;
    else if(metrics === "throughput") experiment_value = markersLayer.getSource().getFeatures()[i].getProperties().throughput;

    // These are preference of the user 
    var pref_val_x0x1 = preference.interval_x0x1.threashold;
    var pref_val_x1x2 = preference.interval_x1x2.threashold;
    var pref_val_x2x3 = preference.interval_x2x3.threashold;

    // Verify the membership of the value respect the range
    if (0 <= experiment_value && experiment_value <= pref_val_x0x1) {
      // console.log("FIRST INTERVAL " + 0 + " < " + experiment_value + " < " + pref_val_x0x1) // DEBUG 
      markersLayer.getSource().getFeatures()[i].setStyle(new ol.style.Style({
        image: new ol.style.Icon(/** @type {module:ol/style/Icon~Options} */({ // /** @type {olx.style.IconOptions} */
          color: preference.interval_x0x1.color, 
          crossOrigin: 'anonymous',
          src: '/img/dot.png'
        }))
      }));

    } else if (pref_val_x0x1 < experiment_value && experiment_value <= pref_val_x1x2) {
      // console.log("SECOND INTERVAL " + pref_val_x0x1 + " < " + experiment_value + " < " + pref_val_x1x2) // DEBUG 
      markersLayer.getSource().getFeatures()[i].setStyle(new ol.style.Style({
        image: new ol.style.Icon(/** @type {module:ol/style/Icon~Options} */({ // /** @type {olx.style.IconOptions} */
          color: preference.interval_x1x2.color, 
          crossOrigin: 'anonymous',
          src: '/img/dot.png'
        }))
      }));

    } else if (pref_val_x1x2 < experiment_value && experiment_value <= pref_val_x2x3) {
      // console.log("THIRT INTERVAL " + pref_val_x1x2 + " < " + experiment_value + " < " + pref_val_x2x3) // DEBUG
      markersLayer.getSource().getFeatures()[i].setStyle(new ol.style.Style({
        image: new ol.style.Icon(/** @type {module:ol/style/Icon~Options} */({ // /** @type {olx.style.IconOptions} */
          color: preference.interval_x2x3.color, 
          crossOrigin: 'anonymous',
          src: '/img/dot.png'
        }))
      }));
    } else {
      // console.log(">  " + experiment_value) // DEBUG
      markersLayer.getSource().getFeatures()[i].setStyle(new ol.style.Style({
        image: new ol.style.Icon(/** @type {module:ol/style/Icon~Options} */({ // /** @type {olx.style.IconOptions} */
          color: preference.interval_x3x4.color, //  #FF0000
          crossOrigin: 'anonymous',
          src: '/img/dot.png'
        }))
      }));
    }

  }
  
}


/**
 * Get the gloabal map, retrieve the current layers visible and then
 * define a grid for debug
 * 
 * @method defineDebug
 */
function defineDebug() {
  var currentLayers = globalMap.getLayers().getArray();
  var currentLayer = getCurrentLayerByVisible(currentLayers);
  var deb = debugLayer(currentLayer.getSource());
  globalMap.getLayers().getArray().push(deb);
  bootstrapAlert("Zoom in, Zoom out to see the tiles", "Info", "info");
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
  globalMap.setLayerGroup(groupSelected);

  var layers = globalMap.getLayers().getArray();
  // TODO delete
  console.log(layers);
  var debugLayer = getCurrentLayerByTitle(layers, "Debug");

  // disable debug if active a different view
  if (debugLayer != undefined) {
    var index = layers.indexOf(debugLayer);
    layers.splice(index, 1);
  }

  // We Set the grout selected. i.e. Bing, OSM, Stamen and based on this choice
  // we define the layers
  for (var i = 0, len = layers.length; i < len; i++) {
    if (groupSelected.values_.title === "Bing" && layers[i].getType() == "TILE")  {
      layers[i].setVisible(bingStyles[i] === type);
    } else if (groupSelected.values_.title === "Here" && layers[i].getType() == "TILE") {
      // FIXME fix scheme
      layers[i].setVisible(hereStyles[i].scheme === type);
    } else if (groupSelected.values_.title === "Stamen" && layers[i].getType() == "TILE") {
      layers[i].setVisible(stamenStyles[i] === type);
    } else if(layers[i].getType() == "TILE") {
      layers[i].setVisible("OSM");
    }
  }

  // get the value from dropdown inside navbar
  // var actualValueView = $('.selected-view').attr("value");
  // setMarkersView(actualValueView);
  

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
  for (var i = 0, len = bingStyles.length; i < len; ++i) {
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
  for (var i = 0, len = hereStyles.length; i < len; ++i) {
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
  for (var i = 0, len = stamenStyles.length; i < len; ++i) {
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

  var container = $('#popupGeocoder')[0];
  var closer = $('#popup-closerGeocoder')[0];
  var p = definePopup(container, closer);
  globalMap.addOverlay(p);

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
  globalMap.addControl(geocoder);


  // I don't want/need Geocoder layer to be visible
  geocoder.getLayer().setVisible(false);

  //Listen when an address is chosen
  geocoder.on('addresschosen', function (evt) {
    var feature = evt.feature;
    var coord = evt.coordinate;
    var address = evt.address;


    // application specific
    // app.addMarker(feature, coord); // TODO ADD MARKERS
    var content = $('#popup-contentGeocoder');
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
 * @param container the Div that rapresent the popup
 * @param closer the html element that close the popup
 * @method definePopup
 */
function definePopup(container, closer) {
  /**
   * Elements that make up the popup.
   */
  // var container = $('#popup')[0];
  // var closer = $('#popup-closer')[0];
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


/**
 * This function define a Markers based on Database.
 * REF: https://stackoverflow.com/questions/24315801/how-to-add-markers-with-openlayers-3
 * @param exp the list of experiment download from server
 * @method markersMap
 */
function markersMap(exp) {

  var location = [];
  for (var i = 0, len = exp.length; i < len; i++) {

    var marker = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([exp[i].longitude, exp[i].latitude])),
      name: exp[i].name,
      pdr: exp[i].metrics.pdr,
      delay: exp[i].metrics.delay,
      throughput: exp[i].metrics.throughput,
      latitude: exp[i].latitude,
      longitude: exp[i].longitude,
      latitudeServer: exp[i].latitudeServer,
      longitudeServer: exp[i].longitudeServer,
      createdAt: exp[i].createdAt,
      updatedAt: exp[i].updatedAt
    });

    marker.setStyle(new ol.style.Style({
      image: new ol.style.Icon(/** @type {module:ol/style/Icon~Options} */({ // /** @type {olx.style.IconOptions} */
        color: '#ea4335', //  #FF0000
        crossOrigin: 'anonymous',
        src: '/img/dot.png'
      }))
    }));
    location.push(marker);
  }


  // TODO delete
  // ================
  // To see key and value of Features
  // =================
  // console.log(rome.getKeys());
  // console.log(rome.getProperties());

  var vectorSource = new ol.source.Vector({
    features: location
  });

  var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    title: "markers"
  });

  globalMap.addLayer(vectorLayer);

  // https://openlayers.org/en/latest/examples/icon.html
  var container = $('#popup')[0];
  var closer = $('#popup-closer')[0];
  var popup = definePopup(container, closer);
  globalMap.addOverlay(popup);



  // display popup on click
  globalMap.on('click', function (evt) {
    var feature = globalMap.forEachFeatureAtPixel(evt.pixel,
      function (feature) {
        return feature;
      });
    if (feature) {
      var coordinates = feature.getGeometry().getCoordinates();
      popup.setPosition(coordinates);
      var content = $('#popup-content');
      var pdr = '<b> PDR: </b>' + feature.get('pdr') + '<br>';
      var delay = '<b> Delay: </b>' + feature.get('delay') + '<br>';
      var throughput = '<b> Throughput: </b>' + feature.get('throughput') + '<br>';
      var latitude = '<i> Latitude: </i>' + feature.get('latitude') + '<br>';
      var longitude = '<i> Longitude: </i>' + feature.get('longitude') + '<br>';
      var latitudeServer = '<i> Latitude Server: </i>' + feature.get('latitudeServer') + '<br>';
      var longitudeServer = '<i> Longitude Server: </i>' + feature.get('longitudeServer') + '<br>';
      var createdAt = '<sub> Created At: </sub>' + '<sub>' + feature.get('createdAt') + '</sub>' + '<br>';
      var updatedAt = '<sub> Updated At: </sub>' + '<sub>' + feature.get('updatedAt') + '</sub>' + '<br>';
      var newline = '<br>';
      content.html('<p>' + feature.get('name') + '</p>' + pdr + delay + throughput + newline + latitude + longitude + newline + latitudeServer + longitudeServer + newline + createdAt + updatedAt);
    } else {
      popup.setPosition(undefined);
    }
  });

}



/**
 * This function define a Cluster based on Database.
 * REF: https://openlayers.org/en/v4.6.5/examples/cluster.html?q=cluster
 * @param exp the list of experiment download from server
 * @method clusterMap
 */
function clusterMap(exp) {

  var user = $("#authentication-name").attr('value');
  var user_json = jQuery.parseJSON(user);
    
  var location = [];
  for (var i = 0, len = exp.length; i < len; i++) {
    location[i] = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([exp[i].longitude, exp[i].latitude])),
      name: exp[i].name
    });
  }


  var source = new ol.source.Vector({
    features: location
  });

  var clusterSource = new ol.source.Cluster({
    distance: parseInt(user_json.settings.cluster.distance, 10),
    source: source
  });

  var styleCache = {};
  var clusters = new ol.layer.Vector({
    title: 'cluster',
    source: clusterSource,
    style: function (feature) {
      var size = feature.get('features').length;
      var style = styleCache[size];
      if (!style) {
        style = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 10,
            stroke: new ol.style.Stroke({
              color: '#fff'
            }),
            fill: new ol.style.Fill({
              color: '#3399CC'
            })
          }),
          text: new ol.style.Text({
            text: size.toString(),
            fill: new ol.style.Fill({
              color: '#fff'
            })
          })
        });
        styleCache[size] = style;
      }
      return style;
    }
  });

  globalMap.addLayer(clusters);
}

/**
 * This function define a Heatmap based on Database.
 * REF: https://openlayers.org/en/v4.6.5/examples/heatmap-earthquakes.html
 * @param exp the list of experiment download from server
 * @method heatMap
 */
function heatMap(exp) {

  var user = $("#authentication-name").attr('value');
  var user_json = jQuery.parseJSON(user);

  var location = [];
  for (var i = 0, len = exp.length; i < len; i++) {
    location[i] = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([exp[i].longitude, exp[i].latitude])),
      name: exp[i].name
    });
  }

  var vector = new ol.layer.Heatmap({
    source: new ol.source.Vector({
      features: location
    }),
    title: 'heatmap',
  
    blur: parseInt(user_json.settings.heatmap.blur, 10), 
    radius: parseInt(user_json.settings.heatmap.radius, 10) 
  });

  vector.getSource().on('addfeature', function (event) {
    // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
    // standards-violating <magnitude> tag in each Placemark.  We extract it from
    // the Placemark's name instead.
    var name = event.feature.get('name');
    var magnitude = parseFloat(name.substr(2));
    event.feature.set('weight', magnitude - 5);
  });

  globalMap.addLayer(vector);
}


/**
 * Based on param, set Markers, Clusters or HeatMap
 * 
 * @param v {String} - the choice of User
 * @method setMarkersView
 */
function setMarkersView(v) {
  if (v === 'markers') {
    clearViewLayer();
    markersMap(experiments);
  } else if (v === 'cluster') {
    clearViewLayer()
    clusterMap(experiments);
  } else if ((v === 'heatmap')) {
    clearViewLayer()
    heatMap(experiments);
  } else if ((v === 'none')) {
    clearViewLayer();

  }
}

/**
 * Clear from Map of all layers that are Vector. In particular: 
 * - Markers
 * - Cluster
 * - HeatMap
 * 
 * @method clearViewLayer
 */
function clearViewLayer() {
  var layers = globalMap.getLayers().getArray();
  var markersLayer = getCurrentLayerByTitle(layers, "markers");
  var clusterLayer = getCurrentLayerByTitle(layers, "cluster");
  var heatmapLayer = getCurrentLayerByTitle(layers, "heatmap");


  if (markersLayer != undefined) {
    var index = layers.indexOf(markersLayer);
    layers.splice(index, 1);
  }

  if (clusterLayer != undefined) {
    var index = layers.indexOf(clusterLayer);
    layers.splice(index, 1);
  }

  if (heatmapLayer != undefined) {
    var index = layers.indexOf(heatmapLayer);
    layers.splice(index, 1);
  }

  globalMap.render();

}




