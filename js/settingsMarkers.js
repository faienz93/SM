/*
 * ===========================================================================
 * File: SettingsMarkers.js 
 * Author: Antonio Faienza
 * Desc: This scritp manage the functions handle the markers preference of
 * the user
 * ===========================================================================
 */

$(document).ready(function () {


    /**
     * MARKERS
     */
    var cluster_distance_slider_string = $('#cluster-distance-slider');
    var cluster_distance_slider_json =  $.parseJSON(cluster_distance_slider_string.attr('value')); 
    // console.log(cluster_distance_slider_json); // TODO delete
    sliderCluster =  createMarkersSlider('#cluster-distance-slider',0,100,cluster_distance_slider_json)

    var heatmap_radius_slider_string = $('#heatmap-radius-slider');
    var heatmap_radius_slider_json =  $.parseJSON(heatmap_radius_slider_string.attr('value')); 
    // console.log(heatmap_radius_slider_json); // TODO delete
    sliderHeatmapRadius = createMarkersSlider('#heatmap-radius-slider',0,50,heatmap_radius_slider_json)

    var heatmap_blur_slider_string = $('#heatmap-blur-slider');
    var heatmap_blur_slider_json =  $.parseJSON(heatmap_blur_slider_string.attr('value')); 
    // console.log(heatmap_blur_slider_json); // TODO delete
    sliderHeatmapBlur = createMarkersSlider('#heatmap-blur-slider',0,50,heatmap_blur_slider_json);

});



  /**
   * This function create a simple Slider for the settings of Markers
   * i.e: blur size and radius size of HeatMap 
   * distance of cluster
   *
   * @method createMarkersSlider
   * @param inputNumber the id of div that will contain the slider
   * @param min the minimum of slider
   * @param max the maximum of slider 
   * @param value the value of slider
   */
  function createMarkersSlider(inputSlider,min,max,value){


    var slider = $(inputSlider);


   noUiSlider.create(slider[0], {
       start: value, 
       connect: [true, false],
       range: {
           'min': min,
           'max': max
       },
       step: 1,
       format: wNumb({
           decimals: 0, // default is 2
       }),
       pips: { mode: 'count', values: 5 },
       tooltips: true
   });
   
   return slider;

  }