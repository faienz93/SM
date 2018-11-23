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
                $(this).prev().css("background","#ffff");
                $(this).prev().css("color","#000000");
            }else {
                // Else return to the previsulty style
                $(this).prev().css("background","none");
                $(this).prev().css("color","#818181");

            }

            // var a = $(this).children('a');
            // console.log(a);
          });
       
    });

    var a = $(".dropdown-container").children('a').is(":focus");
    console.log(a);
    /* .dropdown-container > a:focus, .default-button > a:focus {
    background-color: #ffff;
    color: #000000;
} */

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