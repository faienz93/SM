
/**
 * ===========================================================================
 * File: Init.js 
 * Author: Antonio Faienza
 * This file load all necessary for the correct executions of Javascript/Jquery
 * functions
 * ===========================================================================
 */$(document).ready(function () {
    $('#hambergerButton').click(function () {
        $(this).toggleClass('is-active');
        var checkClass = $("#hambergerButton").hasClass('is-active');
        if (checkClass) {
            $("#mySidenav").css("width", "250px");
            $("#main").css("marginLeft", "250px");
            $("body").css("backgroundColor","rgba(0,0,0,0.4)");
        } else {
            $("#mySidenav").css("width", "0");
            $("#main").css("marginLeft", "0");
            $("body").css("backgroundColor","white");
        }
    });


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
});