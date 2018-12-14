
/**
 * ===========================================================================
 * File: Init.js 
 * Author: Antonio Faienza
 * This file load all necessary for the correct executions of Javascript/Jquery
 * functions
 * ===========================================================================
 */

$(document).ready(function () {

  
  // Setting navbar
  navbar();

  // Setting the sidebar
  sidebar();

  // defineMap(); 
  

  // OSM
  $('#osm').click(function (event) {      
    $.get('/map?map=OSM&type=osm').then(function (data) {
      $('#main').html(data);
    });    
  });

  // HERE
  $('#normal-day').click(function (event) {      
    $.get('/map?map=Here&type=normal.day').then(function (data) {     
      $('#main').html(data);
    });    
  });

  $('#normal-day-transit').click(function (event) {      
    $.get('/map?map=Here&type=normal.day.transit').then(function (data) {     
      $('#main').html(data);
    });    
  });  
    
  
  $('#pedestrian-day').click(function (event) {      
    $.get('/map?map=Here&type=pedestrian.day').then(function (data) {     
      $('#main').html(data);
    });    
  });  
  
  $('#terrain-day').click(function (event) {      
    $.get('/map?map=Here&type=terrain.day').then(function (data) {     
      $('#main').html(data);
    });    
  });  
  
  $('#satellite-day').click(function (event) {      
    $.get('/map?map=Here&type=satellite.day').then(function (data) {     
      $('#main').html(data);
    });    
  });

  
  
  $('#hybrid-day').click(function (event) {      
    $.get('/map?map=Here&type=hybrid.day').then(function (data) {     
      $('#main').html(data);
    });    
  });

  // BING
  
  
  $('#aerial').click(function (event) {      
    $.get('/map?map=Bing&type=Aerial').then(function (data) {     
      $('#main').html(data);
    });    
  });

  
  
  $('#aerial-with-labels').click(function (event) {      
    $.get('/map?map=Bing&type=AerialWithLabels').then(function (data) {     
      $('#main').html(data);
    });    
  });

  
  
  $('#road').click(function (event) {      
    $.get('/map?map=Bing&type=Road').then(function (data) {     
      $('#main').html(data);
    });    
  });
  
  $('#road-on-demand').click(function (event) {      
    $.get('/map?map=Bing&type=RoadOnDemand').then(function (data) {     
      $('#main').html(data);
    });    
  });

  // STAMEN  
  $('#watercolor').click(function (event) {      
    $.get('/map?map=Stamen&type=watercolor').then(function (data) {     
      $('#main').html(data);
    });    
  });  
  
  $('#toner').click(function (event) {      
    $.get('/map?map=Stamen&type=toner').then(function (data) {     
      $('#main').html(data);
    });    
  });
  
  
  $('#toner-lite').click(function (event) {      
    $.get('/map?map=Stamen&type=toner-lite').then(function (data) {     
      $('#main').html(data);
    });    
  });
  
  
  $('#terrain').click(function (event) {      
    $.get('/map?map=Stamen&type=terrain').then(function (data) {     
      $('#main').html(data);
    });    
  });

  // DEBUG
  // $('#debug').click(function (event) {      
  //   $.get('/map?map=Debug&type=debug').then(function (data) {     
  //     $('#main').html(data);
  //   });    
  // });
  

  // USER DATABASE
  $('#add-new-user').click(function (event) {      
    $.get('/adduser').then(function (data) {
      $('#main').html(data);
    });    
  });
  

  $('#update-user').click(function (event) {
    $.get('/updateuser').then(function (data) {
      $('#main').html(data);
    });
  });

  $('#delete-user').click(function(event){
    $.get('/deleteuser').then(function (data) {
      $('#main').html(data);
    });
  });

});






