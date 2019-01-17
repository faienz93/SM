
/**
 * ===========================================================================
 * File: Init.js 
 * Author: Antonio Faienza
 * This file load all necessary for the correct executions of Javascript/Jquery
 * functions
 * ===========================================================================
 */

$(document).ready(function () {

  chosenPlugin();

  var updateChosenProfessor = []; 
  var result = ['Prova1', 'Prova2', 'Prova3'];
  for(var i = 0; i < result.length; i++){
      // var singleProfessorID = result[i].split("-");                       
      updateChosenProfessor.push(result[i]);
  }
  console.log(updateChosenProfessor);
  // $('#selectExperiment').append('<option value="foo">Bar</option>').trigger("chosen:updated");
  // Other choice...
  for(var j = 0; j < updateChosenProfessor.length; j++){
    appendToChosen(updateChosenProfessor[i], "CACCA");
  }
  


  // Setting navbar
  navbar();

  // Setting the sidebar
  sidebar();

  // The first function set the app: 
  // - Define layers 
  // - Define filter 
  // Then we Create for the first time the map
  settingMap();
  createMap();

  // Definition of view of Partials
  definePartialsMaps();
  definePartialsForms();
  definePartialsTest();


  // Informations alerts
  $('.selected-informations').on("click", function (event) {
    event.preventDefault();
    bootbox.alert({
      message: "<span style='width: 100%; text-align: center'>" +
        "<img style='width: 150px; height: 150px;' src='../img/openlayersLogo.png'> </br>" +
        "<b>University of Bologna - Alma Mater Studiorum</b> </br>" +
        "Mobile Systems (MSc, Semester II) </br>" +
        "<i>Antonio Faienza</i>" +
        "</span>",
      backdrop: true,
    });
    return false;
  });

  

});

function appendToChosen(id,value){
  $('#selectExperiment')
      .append($('<option></option>')
      .val(id)
      // .attr('selected', 'selected')
      .html(value)).trigger('chosen:updated');
}

/**
 * Config the Chosen Plugin
 * @method chosenPlugin
 */
function chosenPlugin() {

  var config = {
      '.chosen-select': {},
      '.chosen-select-deselect': { allow_single_deselect: true },
      '.chosen-select-no-single': { disable_search_threshold: 10 },
      '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
      '.chosen-select-rtl': { rtl: true },
      '.chosen-select-width': { width: '200%' }
  }
  for (var selector in config) {
      $(selector).chosen(config[selector]);
  }
}

/**
* Handle the Navbar
*/
function navbar() {
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
  filter.click(function () {
    if (lastClickedFilter != undefined) {
      lastClickedFilter.removeClass('active');
    }
    $(this).addClass('active');
    lastClickedFilter = $(this);
  });
}


/**
 * Handle the Sidebar
 */
function sidebar() {
  var lastClicked;
  var a = $('.select-specific > li');
  lastClicked = a;
  a.click(function () {
    if (lastClicked !== undefined) {
      lastClicked.removeClass('active');
    }
    $(this).addClass('active');
    lastClicked = $(this);
  });
}


/**
 * This function define the view of Partials for differents map
 */
function definePartialsMaps() {

  // OSM
  $('#osm').click(function (event) {
    $.get('/map?map=OSM&type=osm').then(function (data) {
      $('#main').html(data);
    });
  });

  // HERE
  $('#normal-day').click(function (event) {
    $.get('/map?map=Here&type=normal.day').then(function (data) {
      $('#main').html(data);
    });
  });

  $('#normal-day-transit').click(function (event) {
    $.get('/map?map=Here&type=normal.day.transit').then(function (data) {
      $('#main').html(data);
    });
  });


  $('#pedestrian-day').click(function (event) {
    $.get('/map?map=Here&type=pedestrian.day').then(function (data) {
      $('#main').html(data);
    });
  });

  $('#terrain-day').click(function (event) {
    $.get('/map?map=Here&type=terrain.day').then(function (data) {
      $('#main').html(data);
    });
  });

  $('#satellite-day').click(function (event) {
    $.get('/map?map=Here&type=satellite.day').then(function (data) {
      $('#main').html(data);
    });
  });



  $('#hybrid-day').click(function (event) {
    $.get('/map?map=Here&type=hybrid.day').then(function (data) {
      $('#main').html(data);
    });
  });

  // BING


  $('#aerial').click(function (event) {
    $.get('/map?map=Bing&type=Aerial').then(function (data) {
      $('#main').html(data);
    });
  });



  $('#aerial-with-labels').click(function (event) {
    $.get('/map?map=Bing&type=AerialWithLabels').then(function (data) {
      $('#main').html(data);
    });
  });



  $('#road').click(function (event) {
    $.get('/map?map=Bing&type=Road').then(function (data) {
      $('#main').html(data);
    });
  });

  $('#road-on-demand').click(function (event) {
    $.get('/map?map=Bing&type=RoadOnDemand').then(function (data) {
      $('#main').html(data);
    });
  });

  // STAMEN  
  $('#watercolor').click(function (event) {
    $.get('/map?map=Stamen&type=watercolor').then(function (data) {
      $('#main').html(data);
    });
  });

  $('#toner').click(function (event) {
    $.get('/map?map=Stamen&type=toner').then(function (data) {
      $('#main').html(data);
    });
  });


  $('#toner-lite').click(function (event) {
    $.get('/map?map=Stamen&type=toner-lite').then(function (data) {
      $('#main').html(data);
    });
  });


  $('#terrain').click(function (event) {
    $.get('/map?map=Stamen&type=terrain').then(function (data) {
      $('#main').html(data);
    });
  });

  // DEBUG
  // $('#debug').click(function (event) {      
  //   $.get('/map?map=Debug&type=debug').then(function (data) {     
  //     $('#main').html(data);
  //   });    
  // });



}


/**
 * This function define the view of Partials for different Form
 */
function definePartialsForms() {

  // Add new User
  $('#add-new-user').click(function (event) {
    $.get('/adduser').then(function (data) {
      $('#main').html(data);
    });
  });


  // Update Existing User
  $('#update-user').click(function (event) {
    $.get('/updateuser').then(function (data) {
      $('#main').html(data);
    });
  });

  // Delete Existing User
  $('#delete-user').click(function (event) {
    $.get('/deleteuser').then(function (data) {
      $('#main').html(data);
    });
  });

  // Show all Users
  $('#show-user').click(function (event) {
    $.get('/showuser').then(function (data) {
      $('#main').html(data);
    });
  });
}


/**
 * This function define the view of Partials Test
 */
function definePartialsTest() {
  // Add new Test
  $('#add-new-experiment').click(function (event) {
    $.get('/addexperiment').then(function (data) {
      $('#main').html(data);
    });
  });


  // Update Existing Test
  $('#update-experiment').click(function (event) {
    $.get('/updateexperiment').then(function (data) {
      $('#main').html(data);
    });
  });

  // Delete Existing Test
  $('#delete-experiment').click(function (event) {
    $.get('/deleteexperiment').then(function (data) {
      $('#main').html(data);
    });
  });

  // Show All Test
  $('#show-experiment').click(function (event) {
    $.get('/showexperiment').then(function (data) {
      $('#main').html(data);
    });
  });
}

