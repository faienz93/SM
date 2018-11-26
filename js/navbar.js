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
            $("#mySidenav").css("width", "250px");
            $("#main").css("marginLeft", "250px");
            $("body").css("backgroundColor", "rgba(0,0,0,0.4)");
        } else {
            $("#mySidenav").css("width", "0");
            $("#main").css("marginLeft", "0");
            $("body").css("backgroundColor", "white");
        }
    });


    var lastClicked;
    var a = $('.dropdown-menu').find("a");
    // Set None as Default choice
    a.first().css("background","#c9c9c9");
    a.first().css("color","#000000");
    lastClicked = a;
    a.click(function(){
        if(lastClicked!=undefined){
            lastClicked.css("background","none");
            lastClicked.css("color","#818181");           
        }
        $(this).css("background","#c9c9c9");
        $(this).css("color","#000000");       
        lastClicked =  $(this);
    })
}