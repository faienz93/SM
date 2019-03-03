/*
 * ===========================================================================
 * File: Const.js 
 * Author: Antonio Faienza
 * Desc: This scritp manage the functions for send,receive, update,
 * restore the whole form of the project
 * ===========================================================================
 */


$(document).ready(function () {

  // reset form 
  handleFormUser();
  handleFormExperiment();
  populateFormUpdateExperiment();
  
  // reset form markers
  handleFormCluster();
  handleFormHeatmap();

  // reset form Metrics
  handleFormPDR();
  handleFormThroughput();
  handleFormDelay();

  // Show and Hide the Experiment Form
  slideDownAndUp();

 

  /**
   * Add User
   */
  const addUserForm = $('#addUserForm');
  addUserForm.on('submit', addNewUser);
  var passAddForm = $('#passwordUserFormAdd');
  var meterAdd = $('#password-strength-meter-add');
  var strenghtPwdAdd = $('#password-strength-text-add');
  strengthPassword(passAddForm[0],meterAdd[0],strenghtPwdAdd[0]);


  /**
   * Update User
   */
  const updateUserForm = $('#updateUserForm');
  updateUserForm.on('submit', updateUser);
  var passUpdateForm = $('#passwordUserFormUpdate');
  var meterUpdate = $('#password-strength-meter-update');
  var strenghtPwdUpdate = $('#password-strength-text-update');
  strengthPassword(passUpdateForm[0],meterUpdate[0],strenghtPwdUpdate[0]);


  /**
   * Add Experiment Form
   */
  const addExperimentForm = $('#addExperimentForm');
  addExperimentForm.on('submit', addNewExperiment);

  /**
   * Add Experiment Form JSON
   */
  const addExperimentFormText = $('#addExperimentFormText');
  addExperimentFormText.on('submit', addNewExperimentJSON);

  /**
   * Update Experiment
   */
  const updateExperimentForm = $('#updateExperimentForm');
  updateExperimentForm.on('submit', updateExperiment)


  /**
   * Markers
   */
  const settingsFormCluster = $('#settingsFormCluster'); 
  settingsFormCluster.on('submit',changeClusterPreference);

  const settingsFormHeatmap = $('#settingsFormHeatmap');
  settingsFormHeatmap.on('submit', changeHeatmapPreference);

  /**
   * Metrics
   */
  const settingPDRForm = $('#settingPDRForm');
  settingPDRForm.on('submit', changePDRPreference);

  const settingDelayForm = $('#settingDelayForm');
  settingDelayForm.on('submit', changeDelayPreference);

  const settingThroughputForm = $('#settingThroughputForm');
  settingThroughputForm.on('submit', changeThroughputPreference);

});



/**
 * This function aims to bind event to reset buttons and handler the 
 * show of div
 * @method handleFormUser
 */
function handleFormUser() {

  // ADD USER
  // Reset value of form Add User 
  $('#resetAddUser').click(function () {
    $('#addUserForm')[0].reset();
  });

  // UPDATE USER
  // Reset value of form Update User 
  $('#resetUpdateUser').click(function () {
    // i want avoid the rest of the field ID
    var tempID = $('#idUserFormUpdate').val();
    var user = $("usernameUserFormUpdate").val();
    var mail = $("emailUserFormUpdate").val();
    

    // I reset the form
    $('#updateUserForm')[0].reset();

    // I write agant the ID
    $('#idUserFormUpdate').val(tempID);
    $("usernameUserFormUpdate").val(user);
    $("emailUserFormUpdate").val(mail);

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

  // UPDATE EXPERIMENT
  // Reset value of form Update User 
  $('#resetUpdateExperiment').click(function () {
    // i want avoid the rest of the field ID
    var tempID = $('#idExperimentFormUpdate').val();

    // I reset the form
    $('#updateExperimentForm')[0].reset();

    // I write agant the ID
    $('#idExperimentFormUpdate').val(tempID);

  });
}

/**
 * This function aims to bind event to restore the original 
 * setting of Cluster
 * @method handleFormCluster
 */
function handleFormCluster(){
  
  $('#resetCluster').click(function () { 
    var restoreCluster =  {"distance":40};
    // restore slider value
    sliderCluster[0].noUiSlider.set(restoreCluster.distance);  
  });
}

/**
 * This function aims to bind event to restore the original 
 * setting of HeatMap
 * @method handleFormHeatmap
 */
function handleFormHeatmap(){
  $('#resetHeatMap').click(function () {
    var restoreHeatmap =  {"radius":15,"blur":5};
    // restore slider value
    sliderHeatmapBlur[0].noUiSlider.set(restoreHeatmap.blur); 
    sliderHeatmapRadius[0].noUiSlider.set(restoreHeatmap.radius);
  });
}

/**
 * This function aims to bind event to restore the original 
 * setting of PDR
 * @method handleFormPDR
 */
function handleFormPDR() {

  // Reset value of form PDR experiment
  $('#resetPDR').click(function () {
    var restorePDR = {"interval_x0x1":{"color":"#ff8080","threashold":25},"interval_x1x2":{"color":"#ff3333","threashold":50},"interval_x2x3":{"color":"#e60000","threashold":75},"interval_x3x4":{"color":"#990000"}};
    // restore the color
    $('#pdr_interval_x0x1_color').val(restorePDR.interval_x0x1.color);
    $('#pdr_interval_x1x2_color').val(restorePDR.interval_x1x2.color);
    $('#pdr_interval_x2x3_color').val(restorePDR.interval_x2x3.color);
    $('#pdr_interval_x3x4_color').val(restorePDR.interval_x3x4.color);

    // restore the value
    $('#pdr_interval_x0x1_threashold').val(restorePDR.interval_x0x1.threashold);
    $('#pdr_interval_x1x2_threashold').val(restorePDR.interval_x1x2.threashold);
    $('#pdr_interval_x2x3_threashold').val(restorePDR.interval_x2x3.threashold);

    // update the slider
    var colorPDR = [];
    colorPDR.push($('#pdr_interval_x0x1_color').val());
    colorPDR.push($('#pdr_interval_x1x2_color').val());
    colorPDR.push($('#pdr_interval_x2x3_color').val());
    colorPDR.push($('#pdr_interval_x3x4_color').val());
    var threasholdPDR = [];
    threasholdPDR.push($('#pdr_interval_x0x1_threashold').val());
    threasholdPDR.push($('#pdr_interval_x1x2_threashold').val());
    threasholdPDR.push($('#pdr_interval_x2x3_threashold').val());
    refreshMetricsSlider(sliderPDR,colorPDR, threasholdPDR, intervalSegmentPDR);
  });
}

/**
 * This function aims to bind event to restore the original 
 * setting of Delay
 * @method handleFormDelay
 */
function handleFormDelay(){
   
  // Reset value of form Delay experiment
  $('#resetDelay').click(function () {
    var restoreDelay = {"interval_x0x1":{"color":"#8080ff","threashold":25},"interval_x1x2":{"color":"#3333ff","threashold":50},"interval_x2x3":{"color":"#0000e6","threashold":75},"interval_x3x4":{"color":"#000099"}}
    // restore the color
    $('#delay_interval_x0x1_color').val(restoreDelay.interval_x0x1.color);
    $('#delay_interval_x1x2_color').val(restoreDelay.interval_x1x2.color);
    $('#delay_interval_x2x3_color').val(restoreDelay.interval_x2x3.color);
    $('#delay_interval_x3x4_color').val(restoreDelay.interval_x3x4.color);

    // restore the value
    $('#delay_interval_x0x1_threashold').val(restoreDelay.interval_x0x1.threashold);
    $('#delay_interval_x1x2_threashold').val(restoreDelay.interval_x1x2.threashold);
    $('#delay_interval_x2x3_threashold').val(restoreDelay.interval_x2x3.threashold);

    // update the slider
    var colorDelay = [];
    colorDelay.push($('#delay_interval_x0x1_color').val());
    colorDelay.push($('#delay_interval_x1x2_color').val());
    colorDelay.push($('#delay_interval_x2x3_color').val());
    colorDelay.push($('#delay_interval_x3x4_color').val());
    var threasholdDelay = [];
    threasholdDelay.push($('#delay_interval_x0x1_threashold').val());
    threasholdDelay.push($('#delay_interval_x1x2_threashold').val());
    threasholdDelay.push($('#delay_interval_x2x3_threashold').val());
    refreshMetricsSlider(sliderDelay,colorDelay, threasholdDelay, intervalSegmentDelay);
  });
}

/**
 * This function aims to bind event to restore the original 
 * setting of Throughput
 * @method handleFormThroughput
 */
function handleFormThroughput(){
  // TODO add reset throughput 
  
  // Reset value of form Throughput experiment
  $('#resetThroughput').click(function () {
    var restoreThroughput = {"interval_x0x1":{"color":"#9fdf9f","threashold":25},"interval_x1x2":{"color":"#66cc66","threashold":50},"interval_x2x3":{"color":"#39ac39","threashold":75},"interval_x3x4":{"color":"#267326"}};
    // restore the color
    $('#throughput_interval_x0x1_color').val(restoreThroughput.interval_x0x1.color);
    $('#throughput_interval_x1x2_color').val(restoreThroughput.interval_x1x2.color);
    $('#throughput_interval_x2x3_color').val(restoreThroughput.interval_x2x3.color);
    $('#throughput_interval_x3x4_color').val(restoreThroughput.interval_x3x4.color);

    // restore the value
    $('#throughput_interval_x0x1_threashold').val(restoreThroughput.interval_x0x1.threashold);
    $('#throughput_interval_x1x2_threashold').val(restoreThroughput.interval_x1x2.threashold);
    $('#throughput_interval_x2x3_threashold').val(restoreThroughput.interval_x2x3.threashold);

    // update the slider
    var colorThroughput = [];
    colorThroughput.push($('#throughput_interval_x0x1_color').val());
    colorThroughput.push($('#throughput_interval_x1x2_color').val());
    colorThroughput.push($('#throughput_interval_x2x3_color').val());
    colorThroughput.push($('#throughput_interval_x3x4_color').val());
    var threasholdThroughput = [];
    threasholdThroughput.push($('#throughput_interval_x0x1_threashold').val());
    threasholdThroughput.push($('#throughput_interval_x1x2_threashold').val());
    threasholdThroughput.push($('#throughput_interval_x2x3_threashold').val());
    refreshMetricsSlider(sliderThroughput,colorThroughput, threasholdThroughput, intervalSegmentThroughput);
  });
}



/**
* This method aims to populate the update form of the Experiments
* 
* @method populateFormUpdateExperiment
*/
function populateFormUpdateExperiment(){
  $('#findExperimentUpdate').on('change',function (){
    // at the start all field are disabled. Then when i choice from dropdown becomes enabled    
    $('#latitudeExperimentFormUpdate').removeAttr("disabled");
    $('#longitudeExperimentFormUpdate').removeAttr("disabled");
    $('#pdrExperimentFormUpdate').removeAttr("disabled");
    $('#delayExperimentFormUpdate').removeAttr("disabled");
    $('#throughputExperimentFormUpdate').removeAttr("disabled");
    $('#nameExperimentFormUpdate').removeAttr("disabled");
    $('#latitudeServerExperimentFormUpdate').removeAttr("disabled");
    $('#longitudeServerExperimentFormUpdate').removeAttr("disabled");
    $('#sendExperimentFormUpdate').removeAttr("disabled");
    $("#resetUpdateExperiment").removeAttr("disabled");
   
    var val = jQuery.parseJSON(this.value);
    $('#idExperimentFormUpdate').val(val._id);
    $('#latitudeExperimentFormUpdate').val(val.latitude);
    $('#longitudeExperimentFormUpdate').val(val.longitude);
    $('#pdrExperimentFormUpdate').val(val.metrics.pdr);
    $('#delayExperimentFormUpdate').val(val.metrics.delay);
    $('#throughputExperimentFormUpdate').val(val.metrics.throughput);
    $('#nameExperimentFormUpdate').val(val.name);
    $('#latitudeServerExperimentFormUpdate').val(val.latitudeServer);
    $('#longitudeServerExperimentFormUpdate').val(val.latitudeServer);
  })
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
      // RESET FORM
      // -----------------------
      $('#updateUserForm')[0].reset();
      $('#password-strength-text-update').empty();

      // UPDATE THE VIEW
      $("#usernameUserFormUpdate").val(res.currentUser.username);
      $("#emailUserFormUpdate").val(res.currentUser.email);

      var str_user = JSON.stringify(res.currentUser);
      $("#authentication-name").attr('value', str_user);
      $("#authentication-name").text(res.currentUser.username)
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
  * Update Experiment 
  */
 function updateExperiment(e){
  e.preventDefault();
  
  $.ajax({
    url: ' /updateexperiment',
    method: 'POST',
    data: $('#updateExperimentForm').serialize(),
    success: function (res) {
      console.log(res);
      // -----------------------
      // REFRESH DROPDOWN
      // -----------------------
      // Update the dropdown list
      $('#findExperimentUpdate').empty();

      // Set the new Length of dropdown
      $("#findExperimentUpdate").append(
        $('<option disabled selected></option>').html("Select experiment from " + res.experiments.length)
      );

      // Appen all items
      $(res.experiments).each(function () {
        $("<option />", {
          val: JSON.stringify(this),
          text: this.name
        }).appendTo("#findExperimentUpdate");
      });

      // -----------------------
      // RESET FORM
      // -----------------------
      $('#updateExperimentForm')[0].reset();
      

      // refresh Experiments
      refreshExperiments();

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
            $('#logout').submit();         
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
 * This function create an popub of bootstrap for confirm or decline 
 * a specic choice. If this is positive than submit the form
 * passed as param
 * 
 * @method deleteExperimentForm
 * @param {Object} form - the form to verify
 * @param {String} message - the message that you want display. 
 *                          If it not specified you will see a default message
 */
function deleteExperimentForm(form, message = 'Are you sure to delete this Experiment? ') {
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
          url: '/deleteexperiment',
          method: 'POST',
          data: $('#deleteExperimentForm').serialize(),
          success: function (res) {

            // Update the dropdown list
            $('#findExperimentDelete').empty();

            // Set the new Length of dropdown
            $("#findExperimentDelete").append(
              $('<option disabled selected></option>').html("Select experiments from " + res.experiments.length)
            );

            // Appen all items
            $(res.experiments).each(function () {
              $("<option />", {
                val: JSON.stringify(this),
                text: this.name
              }).appendTo("#findExperimentDelete");
            });

            refreshExperiments();
           
            // Feedback to User
            bootstrapAlert(res.success, "Success", "success");
          },
          error: function (err) {
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
   * EXPERIMENT FORM
 ****************************************************/
/**
 * validation and then send request to Server
 */
function addNewExperimentJSON(e){
  e.preventDefault();

  var jsonExperiment = $('#multiexperiments').val();  
  var parseJsonExperiment = parseJson(jsonExperiment);

  // If the validation of JSON is true, then will send the request
  // to the server
  if(parseJsonExperiment[0]==200){
    $.ajax({
      url: '/addexperiment',
      method: 'POST',
      data: $('#addExperimentFormText').serialize(),
      async: true,
      success: function (res) {
        refreshExperiments();
        // FEEDBACK
        bootstrapAlert(res.success, "Success", "success");
      },
      error: function (err) {
        var statusCode = err.responseJSON.statusCode;
        if(statusCode==400){
          bootstrapAlert(err.responseJSON.errors, "JSON Error", "danger", false);
        }
      }
    });
  }else if(parseJsonExperiment[0]==400){
    bootstrapAlert(parseJsonExperiment[1],"JSON Error","danger")
  }  
  return false;
}

function addNewExperiment(e){
  e.preventDefault();

  $.ajax({
    url: '/addexperimentform',
    method: 'POST',
    data: $('#addExperimentForm').serialize(),
    async: true,
    success: function (res) {
      $('#addExperimentForm')[0].reset();
      refreshExperiments();
      bootstrapAlert(res.success, "Success", "success");
    },
    error: function (err) {
      var statusCode = err.responseJSON.statusCode;
      if(statusCode==400){
        bootstrapAlert(err.responseJSON.errors, "JSON Error", "danger", false);
      }else if(statusCode===422){
        var errorJSON = err.responseJSON.errors;
        // console.log(errorJSON);
        var e = "";
        for (var i = 0; i < errorJSON.length; i++) {
          e += errorJSON[i].msg + "</br>";
        }
        bootstrapAlert(e, "Error", "danger", false);
      }
    }
  });

  return false;
}

/**
 * Markers function
 */

function changeClusterPreference(e){
  e.preventDefault()
  $.ajax({
    url: '/settingCluster', 
    method: 'POST',
    data: $('#settingsFormCluster').serialize()+"&cluster_distance="+sliderCluster[0].noUiSlider.get(),  
    async: true,
    success: function (res) {
      // FEEDBACK
      bootstrapAlert(res.success, "Success", "success");
    },
    error: function (err) {
      var statusCode = err.responseJSON.statusCode;
      if(statusCode==422){
        bootstrapAlert(err.responseJSON.errors, "JSON Error", "danger", false);
      }else if(statusCode===11000){
        var errorJSON = err.responseJSON.errors.message;        
        bootstrapAlert(errorJSON, "Error", "danger", false);
      }
    }
  });
  return false;
}


function changeHeatmapPreference(e){
  e.preventDefault();
  $.ajax({
    url: '/settingHeatmap', 
    method: 'POST',
    data: $('#settingsFormHeatmap').serialize()+"&heatmap_radius="+sliderHeatmapRadius[0].noUiSlider.get()+"&heatmap_blur="+sliderHeatmapBlur[0].noUiSlider.get(), 
    async: true,
    success: function (res) {
      
      // FEEDBACK
      bootstrapAlert(res.success, "Success", "success");
    },
    error: function (err) {
      var statusCode = err.responseJSON.statusCode;
      if(statusCode==422){
        bootstrapAlert(err.responseJSON.errors, "JSON Error", "danger", false);
      }else if(statusCode===11000){
        var errorJSON = err.responseJSON.errors.message;        
        bootstrapAlert(errorJSON, "Error", "danger", false);
      }
    }
  });
  return false;
}




/**
 * Metrics function
 */
function changePDRPreference(e){
  e.preventDefault();

  $.ajax({
    url: '/settingPDR', 
    method: 'POST',
    data: $('#settingPDRForm').serialize(), 
    async: true,
    success: function (res) {
      
      // FEEDBACK
      bootstrapAlert(res.success, "Success", "success");
    },
    error: function (err) {
      var statusCode = err.responseJSON.statusCode;
      if(statusCode==422){
        bootstrapAlert(err.responseJSON.errors, "JSON Error", "danger", false);
      }else if(statusCode===11000){
        var errorJSON = err.responseJSON.errors.message;        
        bootstrapAlert(errorJSON, "Error", "danger", false);
      }
    }
  });

  return false;
}


function changeDelayPreference(e){
  e.preventDefault();

  $.ajax({
    url: '/settingDelay', 
    method: 'POST',
    data: $('#settingDelayForm').serialize(), 
    async: true,
    success: function (res) {
      
      // FEEDBACK
      bootstrapAlert(res.success, "Success", "success");
    },
    error: function (err) {
      var statusCode = err.responseJSON.statusCode;
      if(statusCode==422){
        bootstrapAlert(err.responseJSON.errors, "JSON Error", "danger", false);
      }else if(statusCode===11000){
        var errorJSON = err.responseJSON.errors.message;        
        bootstrapAlert(errorJSON, "Error", "danger", false);
      }
    }
  });

  return false;
}


function changeThroughputPreference(e){
  e.preventDefault();

  $.ajax({
    url: '/settingThroughput', 
    method: 'POST',
    data: $('#settingThroughputForm').serialize(), 
    async: true,
    success: function (res) {
      
      // FEEDBACK
      bootstrapAlert(res.success, "Success", "success");
    },
    error: function (err) {
      var statusCode = err.responseJSON.statusCode;
      if(statusCode==422){
        bootstrapAlert(err.responseJSON.errors, "JSON Error", "danger", false);
      }else if(statusCode===11000){
        var errorJSON = err.responseJSON.errors.message;        
        bootstrapAlert(errorJSON, "Error", "danger", false);
      }
    }
  });

  return false;
}

