/**
 * ===========================================================================
 * File: Navbar.js 
 * Author: Antonio Faienza
 * This file handle the Navbar
 * ===========================================================================
 */

 /**
 * Handle the Navbar
 */
function navbar(){
     // When click on the hamburger icon (Thanks the appropriate library) it open and close the 
    // sidebar
    $('#hambergerButton').click(function () {
        $(this).toggleClass('is-active');
        var checkClass = $("#hambergerButton").hasClass('is-active');
        if (checkClass) {
            // $("body").css("backgroundColor", "rgba(0,0,0,0.4)");
            $('#sidebar').toggleClass('active');
        
           
        } else {
            // $("body").css("backgroundColor", "white");
            $('#sidebar').toggleClass('active');
          
          
        }
    });

     
    var lastClickedFilter;
    var filter = $('.dropdown-menu').find('a');
    lastClickedFilter = filter;
    filter.click(function(){
        if(lastClickedFilter != undefined){
            lastClickedFilter.removeClass('active'); 
        }
        $(this).addClass('active'); 
        lastClickedFilter = $(this);
    });



    
}