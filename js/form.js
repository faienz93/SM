$(document).ready(function () {
 
  // reset form
  handleFormUser();
  handleFormExperiment();

  // Show and Hide the Experiment Form
  slideDownAndUp();

  // Populate the form of main page when required
  populateFormUpdate();

  const addUserForm = $('#addUserForm');
  addUserForm.on('submit', addNewUser);
  var passAddForm = $('#passwordUserFormAdd');
  var meterAdd = $('#password-strength-meter-add');
  var strenghtPwdAdd = $('#password-strength-text-add');
  strengthPassword(passAddForm[0],meterAdd[0],strenghtPwdAdd[0]);


  const updateUserForm = $('#updateUserForm');
  updateUserForm.on('submit', updateUser);
  var passUpdateForm = $('#passwordUserFormUpdate');
  var meterUpdate = $('#password-strength-meter-update');
  var strenghtPwdUpdate = $('#password-strength-text-update');
  strengthPassword(passUpdateForm[0],meterUpdate[0],strenghtPwdUpdate[0]);


  /**
   * Experiment Form
   */
  const addExperimentFormText = $('#addExperimentFormText');
  addExperimentFormText.on('submit', addNewExperimentJSON);
});



/**
 * This function aims to bind event to reset buttons and handler the 
 * show of div
 * @method handleFormUser
 */
function handleFormUser() {

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
 * This function aims to bind event to reset buttons and handler the 
 * show of div of Experiment Form
 * @method handleFormExperiment
 */
function handleFormExperiment() {
  // Reset value of form Add Experiment 
  $('#resetAddExperiment').click(function () {
    $('#addExperimentForm')[0].reset();
  });

  // Reset value of form Add Experiment 
  $('#resetAddExperimentText').click(function () {
    $('#addExperimentFormText')[0].reset();
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


/**
 * This function is used for show and hide the header of experiment
 */
function slideDownAndUp() {

  // slideToggle Experiment
  $('#headerExperiment').click(function () {
      $('#cardBodyExperiment').slideToggle("slow");
  });

  // slideToggle Experiment Text
  $('#headerExperimentText').click(function () {
      $('#cardBodyExperimentText').slideToggle("slow");
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
      // Reset Suggestion password
      $('#password-strength-text-add').empty();
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

      // -----------------------
      // REFRESH DROPDOWN
      // -----------------------
      // Update the dropdown list
      $('#findUserUpdate').empty();

      // Set the new Length of dropdown
      $("#findUserUpdate").append(
        $('<option disabled selected></option>').html("Select users from " + res.users.length)
      );

      // Appen all items
      $(res.users).each(function () {
        $("<option />", {
          val: JSON.stringify(this),
          text: this.username
        }).appendTo("#findUserUpdate");
      });

      // -----------------------
      // RESET FORM
      // -----------------------
      $('#updateUserForm')[0].reset();
      $('#password-strength-text-update').empty();


      // FEEDBACK
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

            // Update the dropdown list
            $('#findProfessorDelete').empty();

            // Set the new Length of dropdown
            $("#findProfessorDelete").append(
              $('<option disabled selected></option>').html("Select users from " + res.users.length)
            );

            // Appen all items
            $(res.users).each(function () {
              $("<option />", {
                val: JSON.stringify(this),
                text: this.username
              }).appendTo("#findProfessorDelete");
            });

            // Feedback to User
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


/**
 * This method define a strength of a password based on 
 * "xcvbn" library. 
 * 
 * REF: https://css-tricks.com/password-strength-meter/
 *      https://github.com/dropbox/zxcvbn
 * 
 * @method strengthPassword
 */
function strengthPassword(password,meter,text) {
  
  var strength = {
    0: "Worst ☹",
    1: "Bad ☹",
    2: "Weak ☹",
    3: "Good ☺",
    4: "Strong ☻"
  }

  // var password = document.getElementById('passwordUserFormAdd');
  // var meter = document.getElementById('password-strength-meter');
  // var text = document.getElementById('password-strength-text');

  if(password){
    password.addEventListener('input', function () {
      var val = password.value;
      var result = zxcvbn(val);
  
      // Update the password strength meter
      meter.value = result.score;
  
      // Update the text indicator
      if (val !== "") {
        text.innerHTML = "Strength: " + "<strong>" + strength[result.score] + "</strong>" + "<span class='feedback'>" + result.feedback.warning + " " + result.feedback.suggestions + "</span";
      } else {
        text.innerHTML = "";
      }
    });
  }

}



/*****************************************************
   * TEST FORM
 ****************************************************/
function addNewExperimentJSON(e){
  e.preventDefault();

  var jsonExperiment = $('#multiexperiments').val();  
  var parseJsonExperiment = parseJson(jsonExperiment);

  // If the validation of JSON is true, then will send the request
  // to the server
  // if(parseJsonExperiment[0]==200){
  //     $.ajax({
  //     url: '/addtest',
  //     method: 'POST',
  //     data: $('#addExperimentFormText').serialize(),
  //     success: function (res) {
  //       console.log(res);
  //     },
  //     error: function (err) {
  //       console.log(err);
  //     }
  //   });
  // }else if(parseJsonExperiment[0]==400){
  //   bootstrapAlert(parseJsonExperiment[1],"JSON Error","danger")
  // }

  $.ajax({
    url: '/addexperiment',
    method: 'POST',
    data: $('#addExperimentFormText').serialize(),
    async: true,
    success: function (res) {
      console.log(res);
    },
    error: function (err) {
      var statusCode = err.responseJSON.statusCode;
      if(statusCode==400){
        bootstrapAlert(err.responseJSON.errors, "JSON Error", "danger", false);
      }
    }
  });
  return false;
}