
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

  // Populate the form of main page when required
  populateFormUpdate();

});


/**
 * This function aims to bind event to reset buttons and handler the 
 * show of div
 * @method handleForm
 */
function handleForm() {
 
  /**
   * each clickable event has the same value. 
   * This value is equal to ID of div that i 
   * want show or hide. 
   */
  $('.swapDiv').on("click", function () {
    var operation = $(this).attr("value");
      $(".mainDiv").each(function () {
        $(this).css("display", "none");
      });
      $('#'+operation).css("display", "block");      
  });

  // Reset value of form Add User 
  $('#resetAddUser').click(function () {
    $('#addUserForm')[0].reset();
  });

  // Reset value of form Update User 
  $('#resetUpdateUser').click(function () {
    // i want avoid the rest of the field ID
    var tempID = $('#idUserFormUpdate').val();

    // I reset the form
    $('#updateUserForm')[0].reset();

    // I write agant the ID
    $('#idUserFormUpdate').val(tempID);

  });
}



/**
 * This method aims to populate the update form
 * 
 * @method populateFormUpdate
 */
function populateFormUpdate(){
  $('select').on('change', function() {
    var val = jQuery.parseJSON( this.value );  
    $('#idUserFormUpdate').val(val._id);
    $('#usernameUserFormUpdate').val(val.username);
    $('#emailUserFormUpdate').val(val.email);
    $('#passwordUserFormUpdate').val(val.password);
     
  });
}