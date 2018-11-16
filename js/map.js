


function map(){
    var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM() // Tiled Layer
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([11.327591, 44.498955]), // Longitude and Latitude 
          zoom: 13
        })
      });
}