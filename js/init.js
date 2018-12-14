
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

  
  

  
  $('#osm').click(function (event) {      
    $.get('/map?map=OSM&type=osm').then(function (data) {
      $('#main').html(data);
    });    
  });

  $('#ciao').click(function (event) {      
    $.get('/map?map=Here&type=normal.day').then(function (data) {
     
      $('#main').html(data);
    });    
  });

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






