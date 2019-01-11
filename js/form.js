$(document).ready(function () {

  // reset form
  handleForm();

  // Populate the form of main page when required
  populateFormUpdate();

  const addUserForm = $('#addUserForm');
  addUserForm.on('submit', addNewUser);


  const updateUserForm = $('#updateUserForm');
  updateUserForm.on('submit', updateUser);

  // <form class="form" id="" role="form" autocomplete="off" onsubmit="return formSubmit(this)" action="/deleteuser" method="POST"></form>
  const deleteUserForm = $('#deleteUserForm');
  deleteUserForm.on('submit', deleteUser);


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
function populateFormUpdate() {

  $('select').on('change', function () {

    // at the start all field are disabled. Then when i choice from dropdown becomes enabled
    $('#usernameUserFormUpdate').removeAttr("disabled");
    $('#emailUserFormUpdate').removeAttr("disabled");
    $('#passwordUserFormUpdate').removeAttr("disabled");
    $('#confirmPasswordUserFormUpdate').removeAttr("disabled");
    $('#sendUserFormUpdate').removeAttr("disabled");
    $("#resetUpdateUser").removeAttr("disabled");


    // set the field with the information of value from dropdown
    var val = jQuery.parseJSON(this.value);
    $('#idUserFormUpdate').val(val._id);
    $('#usernameUserFormUpdate').val(val.username);
    $('#emailUserFormUpdate').val(val.email);
    $('#passwordUserFormUpdate').val(val.password);

  });

}


/*****************************************************
 * HANDLE FORM
 ****************************************************/

 /**
 * This function add New User to Database
 */
function addNewUser(e) {
  e.preventDefault();

  $.ajax({
    url: '/adduser',
    method: 'POST',
    data: $('#addUserForm').serialize(),
    success: function (res) {
      bootstrapAlert(res.success, "Success", "success");
      // Reset value of form Add User       
      $('#addUserForm')[0].reset();
    },
    error: function (err) {
      // console.log(err);
      var statusCode = err.responseJSON.statusCode;
      if (statusCode == 422) {
        var errorJSON = err.responseJSON.errors;
        // console.log(errorJSON);
        var e = "";
        for (var i = 0; i < errorJSON.length; i++) {
          e += errorJSON[i].msg + "</br>";
        }
        bootstrapAlert(e, "Error", "danger", false);
      } else if (statusCode == 11000) {
        var errorJSON = err.responseJSON.errors;
        // console.log(errorJSON);
        bootstrapAlert(errorJSON.name + " - " + errorJSON.message, "Error", "danger", false);
      }
    }
  });

  return false;
}

/**
 * This function create Update the Field of Form with Jquery
 */
function updateUser(e) {
  e.preventDefault();

  $.ajax({
    url: ' /updateuser',
    method: 'POST',
    data: $('#updateUserForm').serialize(),
    success: function (res) {
      bootstrapAlert(res.success, "Success", "success");

    },
    error: function (err) {
      // console.log(err);
      var statusCode = err.responseJSON.statusCode;
      if (statusCode == 422) {
        var errorJSON = err.responseJSON.errors;
        // console.log(errorJSON);
        var e = "";
        for (var i = 0; i < errorJSON.length; i++) {
          e += errorJSON[i].msg + "</br>";
        }
        bootstrapAlert(e, "Error", "danger", false);
      } else if (statusCode == 11000) {
        var errorJSON = err.responseJSON.errors;
        // console.log(errorJSON);
        bootstrapAlert(errorJSON.name + " - " + errorJSON.message, "Error", "danger", false);
      }

    }
  });

  return false;
}




/**
 * This function create an popub of bootstrap for confirm or decline 
 * a specic choice. If this is positive than submit the form
 * passed as param
 * 
 * @method formSubmit
 * @param {Object} form - the form to verify
 * @param {String} message - the message that you want display. 
 *                          If it not specified you will see a default message
 */
function deleteUserForm(form, message = 'Are you sure? ') {
  bootbox.confirm({
      message: message,
      buttons: {
          confirm: {
              label: "<i class='fa fa-check'></i> Confirm",
              className: 'btn-secondary'
          },
          cancel: {
              label: "<i class='fa fa-times'></i> Cancel",
              className: 'btn-dark'
          }
      },
      callback: function (result) {
          if (result) {
              // form.submit();

              $.ajax({
                  url: '/deleteuser',
                  method: 'POST',
                  data: $('#deleteUserForm').serialize(),
                  success: function (res) {
                    bootstrapAlert(res.success, "Success", "success");                
                  },
                  error: function (err) {
                    // console.log(err);
                    var statusCode = err.responseJSON.statusCode;
                    if (statusCode == 422) {
                      var errorJSON = err.responseJSON.errors;
                      // console.log(errorJSON);
                      var e = "";
                      for (var i = 0; i < errorJSON.length; i++) {
                        e += errorJSON[i].msg + "</br>";
                      }
                      bootstrapAlert(e, "Error", "danger", false);
                    } else if (statusCode == 11000) {
                      var errorJSON = err.responseJSON.errors;
                      // console.log(errorJSON);
                      bootstrapAlert(errorJSON.name + " - " + errorJSON.message, "Error", "danger", false);
                    }
              
                  }
                });
          }
      }
  });
  return false;

}


