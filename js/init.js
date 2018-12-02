
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

  // Setting the map 
  map(); 

  $('.swapDiv').on("click", function () {
    var operation = $(this).attr("value");
    if(operation==="addUser"){
      $(".mainDiv").each(function() {
        $(this).css("display","none");
      });
      $('#addUserDiv').css("display","block");
    }else if(operation==="modifyUser"){
      $(".mainDiv").each(function() {
        $(this).css("display","none");
      });
      $('#modifyUserDiv').css("display","block");
    }else if(operation==="deleteUser"){
      $(".mainDiv").each(function() {
        $(this).css("display","none");
      });
      $('#deleteUserDiv').css("display","block");
    }else {
      $(".mainDiv").each(function() {
        $(this).css("display","none");
      });
      $('#map').css("display","block");
    }
  });
});