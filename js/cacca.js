$(document).ready(function () {
    console.log("PROVA");
     $('select').on('change', function() {

    console.log("sdjkafjsdkofjsdokfjosdfkjsdofi");
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
});