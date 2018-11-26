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
            // $("#mySidenav").css("width", "250px");
            // $("#main").css("marginLeft", "250px");
            // $("body").css("backgroundColor", "rgba(0,0,0,0.4)");
            $("body").css("backgroundColor", "rgba(0,0,0,0.4)");
            $('#sidebar').toggleClass('active');
        
           
        } else {
            // $("#mySidenav").css("width", "0");
            // $("#main").css("marginLeft", "0");
            $("body").css("backgroundColor", "white");
            $('#sidebar').toggleClass('active');
          
          
        }
    });



    var lastClicked;
    var a = $('.select-specific > li');
  
    lastClicked = a;
    a.click(function(){
        console.log(this.innerText)
        if(lastClicked!==undefined){
            lastClicked.removeClass('active');     
        }
        $(this).addClass('active');        
        lastClicked =  $(this);
    })
}