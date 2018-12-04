
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

 
  // var str;
  // $( ".chosen-select option:selected" ).change(function() {    
  //   // str += $( this ).text() + " ";
  //   console.log( $( this ).text());
  // });
 
  $('select').on('change', function() {

    var val = jQuery.parseJSON( this.value );
  

    
    console.log(val.username);
    console.log(val.email);
    $('#usernameUserFormUpdate').val(val.username);
    $('#emailUserFormUpdate').val(val.email);
    $('#passwordUserFormUpdate').val(val.password);
    
    
     
    
     
  });


  // $( "select.chosen-select" )
  // .change(function () {
  //   $( "select.chosen-select option:selected" ).each(function() {
  //     // str += $( this ).text() + " ";
  //     // console.log($( this ).text());
  //     console.log($(this));
  //   });
    
  // });
  // .change();





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
    $('#updateUserForm')[0].reset();
  });
}




function populateFormUpdate(user){
  console.log(user);
}