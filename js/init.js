
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

  // reset form
  handleForm();

  // Setting the map 
  map();


});


/**
 * This function aims to bind event to reset buttons
 * @method handleForm
 */
function handleForm() {
  // handle show div
  $('.swapDiv').on("click", function () {
    var operation = $(this).attr("value");
    if (operation === "addUser") {
      $(".mainDiv").each(function () {
        $(this).css("display", "none");
      });
      $('#addUserDiv').css("display", "block");
    } else if (operation === "updateUser") {
      $(".mainDiv").each(function () {
        $(this).css("display", "none");
      });
      $('#updateyUserDiv').css("display", "block");
    } else if (operation === "deleteUser") {
      $(".mainDiv").each(function () {
        $(this).css("display", "none");
      });
      $('#deleteUserDiv').css("display", "block");
    } else {
      $(".mainDiv").each(function () {
        $(this).css("display", "none");
      });
      $('#map').css("display", "block");
    }
  });

  // Reset value of form Add User 
  $('#resetAddUser').click(function () {
    $('#addUserForm')[0].reset();
  });

  // Reset value of form Update User 
  $('#resetUpdateUser').click(function () {
    $('#updateUserForm')[0].reset();
  });
}