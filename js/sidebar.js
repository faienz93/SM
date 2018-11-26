/**
 * ===========================================================================
 * File: Sidebar.js 
 * Author: Antonio Faienza
 * This file handle the sidebar
 * ===========================================================================
 */

/**
 * Handle the Sidebar
 */
function sidebar() {
   

    var lastClicked;
    var a = $('.select-specific > li');  
    lastClicked = a;
    a.click(function(){
        if(lastClicked!==undefined){
            lastClicked.removeClass('active');     
        }
        $(this).addClass('active');        
        lastClicked =  $(this);
    });


}