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