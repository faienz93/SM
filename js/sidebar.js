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

   

    //Loop through all dropdown buttons to toggle between hiding and showing its dropdown content
    //This allows the user to have multiple dropdowns without any conflict 
    //REF: https://www.w3schools.com/howto/howto_js_dropdown_sidenav.asp    
    // JQUERY
    var dropdown = $(".dropdown-btn");
    dropdown.click(function (event) {
        var container = $(this).next();

        // open and close the sibling of the current menù
        container.slideToggle("slow", function() { 
            var isVisible = container.is(":visible");
            if(isVisible){
                // if visible change layout
                $(this).prev().css("background","#c9c9c9");
                $(this).prev().css("color","#000000");
            }else {
                // Else return to the previsulty style
                $(this).prev().css("background","none");
                $(this).prev().css("color","#818181");
            }
          });
       
    });


    // When i click on a element then you can color the item 
    // and clear the last item
    var lastClicked;
    var a = $('.customSameStyle').find("a");
    // Set OSM as Default choice
    // a.first().css("background","#c9c9c9");
    // a.first().css("color","#000000");
    lastClicked = a;
    a.click(function(){
        if(lastClicked!=undefined){              
            lastClicked.removeClass('active');        
        }
          
        $(this).addClass('active');      
        lastClicked =  $(this);
    })
    
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


    // JAVSCRIPT - TODO DELETE
    // var dropdown = document.getElementsByClassName("dropdown-btn");
    // var i;

    // for (i = 0; i < dropdown.length; i++) {
    //     dropdown[i].addEventListener("click", function () {
    //         this.classList.toggle("active");
    //         var dropdownContent = this.nextElementSibling;
    //         if (dropdownContent.style.display === "block") {
    //             dropdownContent.style.display = "none";
    //         } else {
    //             dropdownContent.style.display = "block";
    //         }
    //     });
    // }






}