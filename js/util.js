/**
 * ===========================================================================
 * File: Util.js 
 * Author: Antonio Faienza
 * This file is create for handle all features that can be util for whole 
 * project
 * ===========================================================================
 */




/**
 * Based on this anwser: https://stackoverflow.com/a/11978996/4700162 it find 
 * an image that has a SVG tag and then inside the appropiate css it is colored
 * the image
 */
jQuery('img.svg').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');

});


/**
 * This function allows to create an URL that is used from Here WeGo Maps
 * 
 * @method createUrl
 */
function createUrl(tpl, layerDesc) {
    return tpl
      .replace('{base}', layerDesc.base)
      .replace('{type}', layerDesc.type)
      .replace('{scheme}', layerDesc.scheme)
      .replace('{app_id}', layerDesc.app_id)
      .replace('{app_code}', layerDesc.app_code);
  }



  /**
 * This function create an Alert Bootsrap
 * 
 * @method alertMessage
 * @param {*} message the message that appear
 * @param {*} type there are different type of alert:
 *                  @danger
 *                  @warning
 *                  @info
 *                  and other: https://getbootstrap.com/docs/4.0/components/alerts/
 */
// function alertMessage(message, type = 'primary') {
//     var br = document.createElement('br');
//     var div = document.createElement('div');
//     div.setAttribute('class', 'alert alert-' + type + ' text-center '); // alert-fixed
//     // div.setAttribute('role', 'alert');
//     div.innerHTML = '<strong>' + message + '</strong>';

//     document.getElementById('content').appendChild(br);
//     document.getElementById('content').appendChild(div);

//     // Auto close alert
//     // REF:https://codepen.io/CSWApps/pen/XJoLmN
//     window.setTimeout(function () {
//         $('.alert').fadeTo(500, 0).slideUp(500, function () {
//             $(this).remove();
//         });
//     }, 3000);

//     br.remove();
// }

function alertMessage(message, type='primary'){
  var a = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" + 
                "<h4 class='alert-heading'>Well done!</h4>" +
                "<p>"+message+"</p>"+
                "<hr>" +
                "<p class='mb-0'>"+message+"</p>"
            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                "<span aria-hidden='true'>&times;</span>"+
            "</button>"+
            "</div>";
            $('.alert').alert();
    $('#main').html(a);
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
function formSubmit(form,message = 'Are you sure? '){        
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
                    if(result) form.submit(); 
            }
        });
        return false;
    
}


/**
 * This method get the value of param passed into URL
 * 
 * @method getUrlParameter
 * 
 * @param sParam {String} - param passed
 * 
 * REF: https://stackoverflow.com/a/21903119/4700162
 */
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};


