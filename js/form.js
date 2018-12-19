$(document).ready(function () {
    
    // reset form
    handleForm();

    // Populate the form of main page when required
    populateFormUpdate();    


    const addUserForm = $('#addUserForm');

    addUserForm.on('submit', addNewUser);
     
});



/**
 * This function aims to bind event to reset buttons and handler the 
 * show of div
 * @method handleForm
 */
function handleForm() {
 
  
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
       
        // at the start all field are disabled. Then when i choice from dropdown becomes enabled
        $('#usernameUserFormUpdate').removeAttr("disabled");
        $('#emailUserFormUpdate').removeAttr("disabled");
        $('#passwordUserFormUpdate').removeAttr("disabled");
        $('#confirmPasswordUserFormUpdate').removeAttr("disabled"); 
        $('#sendUserFormUpdate').removeAttr("disabled");
        $("#resetUpdateUser").removeAttr("disabled");
      
    
        // set the field with the information of value from dropdown
        var val = jQuery.parseJSON( this.value );  
        $('#idUserFormUpdate').val(val._id);
        $('#usernameUserFormUpdate').val(val.username);
        $('#emailUserFormUpdate').val(val.email);
        $('#passwordUserFormUpdate').val(val.password);
         
      });
    
  }


  /*****************************************************
   * HANDLE FORM
   ****************************************************/
  function addNewUser(e){
    e.preventDefault();

    $.ajax({
      url: '/adduser',
      method: 'POST',
      data: $('#addUserForm').serialize(),
      success: function(res){
        console.log(res.success);
        alertMessage(res.success, "success");
        // alert.html(`<b>${type} ! </b> ${value}`);
        
      },
      error: function(error){
        // console.log(error);
        alertMessage("errore", "error");
      }
    });

    return false;
  }